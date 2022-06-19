import React, { useEffect, useRef, useState, useContext } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { FaPlay, FaShare, FaSignOutAlt, FaStop, FaCheck } from "react-icons/fa";
import "../css/meeting.css";
import fire from "../assets/hola-icegif-23.gif";
import { Context } from "../states/Provider";
import { useReactMediaRecorder } from "react-media-recorder";
import { Decoder, tools, Reader } from "ts-ebml";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";

window.Buffer = window.Buffer || Buffer;

const getInstrument = (value) => {
  switch (parseInt(value)) {
    case 0:
      return "🎤";
    case 1:
      return "🎷";
    case 2:
      return "🎸";
    case 3:
      return "🎹 ";
    case 4:
      return "🎻";
    default:
      return "🥁";
  }
};

const readAsArrayBuffer = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = (ev) => {
      reject(ev);
    };
  });
};

const injectMetadata = (blob) => {
  const decoder = new Decoder();
  const reader = new Reader();
  reader.logging = false;
  reader.drop_default_duration = false;
  return readAsArrayBuffer(blob).then((buffer) => {
    const elms = decoder.decode(buffer);
    elms.forEach((elm) => {
      reader.read(elm);
    });
    reader.stop();
    const refinedMetadataBuf = tools.makeMetadataSeekable(
      reader.metadatas,
      reader.duration,
      reader.cues
    );
    const body = buffer.slice(reader.metadataSize);
    return new Blob([refinedMetadataBuf, body], { type: blob.type });
  });
};

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <video {...props} class="user-video" playsInline autoPlay ref={ref} />;
};

const Room = (props) => {
  const navigate = useNavigate();

  const [recording, setRecording] = useState(false);
  const [state, dispatch] = useContext(Context);
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true, screen: true });
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomID = "123";
  const videoConstraints = {
    minAspectRatio: 1.333,
    minFrameRate: 60,
    height: window.innerHeight / 1.8,
    width: window.innerWidth / 2,
  };

  const createStream = () => {
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", {
          roomID,
          instrument: state.instrument,
        });
        socketRef.current.on("all users", (users) => {
          //console.log(users);
          const peers = [];
          users.forEach((user) => {
            const peer = createPeer(
              user.callerID,
              socketRef.current.id,
              stream,
              user.instrument
            );
            peersRef.current.push({
              peerID: user.callerID,
              peer,
              instrument: user.instrument,
            });
            peers.push({
              peerID: user.callerID,
              peer,
              instrument: user.instrument,
            });
          });
          setPeers(peers);
        });
        socketRef.current.on("user joined", (payload) => {
          console.log("==", payload);
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
            instrument: payload.instrument,
          });
          const peerObj = {
            peer,
            peerID: payload.callerID,
            instrument: payload.instrument,
          };
          setPeers((users) => [...users, peerObj]);
        });

        socketRef.current.on("user left", (id) => {
          const peerObj = peersRef.current.find((p) => p.peerID === id);
          if (peerObj) {
            peerObj.peer.destroy();
          }
          const peers = peersRef.current.filter((p) => p.peerID !== id);
          peersRef.current = peers;
          setPeers(peers);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  };

  function createPeer(userToSignal, callerID, stream, instrument) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
        instrument,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  useEffect(() => {
    socketRef.current = io.connect("https://tohack-2022.herokuapp.com/");
    createStream();
  }, []);

  useEffect(() => {
    if (status == "stopped") {
      (async () => {
        setRecording(false);

        const mediaBlob = await fetch(mediaBlobUrl || "").then((response) =>
          response.blob()
        );

        const seekableBlob = await injectMetadata(mediaBlob);

        const url = URL.createObjectURL(seekableBlob);
        dispatch({
          type: "RECORDED_VIDEO",
          video_url: url,
        });
      })();
    }
  }, [status]);

  return (
    <div class="background d-flex align-items-center justify-content-center flex-column">
      <div class="container-0">
        <h1>{getInstrument(state.instrument)}</h1>
        <video muted class="user-video" ref={userVideo} autoPlay playsInline />
      </div>

      <div class="container-1">
        {peers[0] ? (
          <>
            <h1>{getInstrument(1)}</h1>
            <Video peer={peers[0].peer} />
          </>
        ) : (
          <img
            class="user-video"
            src="https://cdn.discordapp.com/attachments/983046409873936494/987513500115021855/Musio.png"
          />
        )}
      </div>

      <div class="container-2">
        {peers[1] ? (
          <>
            <h1>{getInstrument(2)}</h1>
            <Video peer={peers[1].peer} />
          </>
        ) : (
          <img
            class="user-video"
            src="https://cdn.discordapp.com/attachments/983046409873936494/987513500115021855/Musio.png"
          />
        )}
      </div>

      <div class="container-3">
        {peers[2] ? (
          <>
            <h1>{getInstrument(3)}</h1>
            <Video peer={peers[2].peer} />
          </>
        ) : (
          <img
            class="user-video"
            src="https://cdn.discordapp.com/attachments/983046409873936494/987513500115021855/Musio.png"
          />
        )}
      </div>

      <img class="bonfire" src={fire} />

      <div class="bottom-features d-flex align-items-center justify-content-center">
        <FaSignOutAlt
          color="white"
          size={30}
          className="mx-5"
          onClick={() => {
            window.location.href = "/select";
          }}
        />
        {recording ? (
          <FaStop
            color="red"
            size={30}
            className="mx-5"
            onClick={() => {
              stopRecording();
            }}
          />
        ) : (
          <FaPlay
            color="#5BF921"
            size={30}
            className="mx-5"
            onClick={() => {
              startRecording();
              setRecording(true);
            }}
          />
        )}
        <FaShare color="white" size={30} className="mx-5" />
        {status == "stopped" && (
          <FaCheck
            color="#5BF921"
            size={30}
            className="mx-5"
            onClick={() => {
              navigate("/edit");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Room;
