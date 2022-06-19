import React, { useEffect, useRef, useState, useContext } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { FaPlay, FaShare, FaSignOutAlt } from "react-icons/fa";
import "../css/meeting.css";
import fire from "../assets/hola-icegif-23.gif";
import { Context } from "../states/Provider";

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
const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <video {...props} playsInline autoPlay ref={ref} />;
};

const Room = (props) => {
  const [state, dispatch] = useContext(Context);

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

  return (
    <div class="background d-flex align-items-center justify-content-center flex-column">
      <div class="container-0">
        <h1>ICon {getInstrument(state.instrument)}</h1>
        <video muted class="user-video" ref={userVideo} autoPlay playsInline />
      </div>

      <div class="container-1">
        {peers[0] ? (
          <>
            <h1>ICon {getInstrument(peers[0].instrument)}</h1>
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
            <h1>ICon {getInstrument(peers[1].instrument)}</h1>
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
            <h1>ICon {getInstrument(peers[2].instrument)}</h1>
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
        <FaSignOutAlt color="white" size={30} className="mx-5" />
        <FaPlay color="#5BF921" size={30} className="mx-5" />
        <FaShare color="white" size={30} className="mx-5" />
      </div>
      {/*peers.map((peer, index) => {
        let audioFlagTemp = true;
        let videoFlagTemp = true;
        if (userUpdate) {
          userUpdate.forEach((entry) => {
            if (peer && peer.peerID && peer.peerID === entry.id) {
              audioFlagTemp = entry.audioFlag;
              videoFlagTemp = entry.videoFlag;
            }
          });
        }
        return (
          <div key={peer.peerID}>
            <Video peer={peer.peer} />
          </div>
        );
      })*/}
    </div>
  );
};

export default Room;
