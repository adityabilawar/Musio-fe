import React, { useContext } from "react";
import "../css/edit.css";
import { Context } from "../states/Provider";
import {
  FaCheck,
  FaTrashAlt,
  FaTiktok,
  FaFacebookF,
  FaDownload,
} from "react-icons/fa";
import { AiFillAudio } from "react-icons/ai";
import { BiCut, BiCrop } from "react-icons/bi";
import { RiSoundModuleFill } from "react-icons/ri";
import { IoSpeedometerSharp } from "react-icons/io5";
import { BsYoutube } from "react-icons/bs";

//import { useNavigate } from "react-router-dom";

export default function Edit() {
  const [state] = useContext(Context);
  //const navigate = useNavigate();

  return (
    <div class="background d-flex align-items-center justify-content-center">
      <video autoPlay controls class="edit-video" src={state.video_url} />

      <div class="bottom-features d-flex align-items-center justify-content-center">
        <BiCut color="white" size={30} className="mx-4" />
        <FaTrashAlt color="white" size={30} className="mx-4" />
        <AiFillAudio color="white" size={30} className="mx-4" />
        <BiCrop color="white" size={30} className="mx-4" />
        <RiSoundModuleFill color="white" size={30} className="mx-4" />
        <IoSpeedometerSharp color="white" size={30} className="mx-4" />
        <BsYoutube color="#FC6C85" size={30} className="mx-4" />
        <FaTiktok color="#FC6C85" size={30} className="mx-4" />
        <FaFacebookF color="#FC6C85" size={30} className="mx-4" />
        <FaDownload color="#add8e6" size={30} className="mx-4" />
        <FaCheck
          color="#5BF921"
          size={30}
          className="mx-4"
          onClick={() => {
            window.location.href = "/select";
          }}
        />
      </div>
    </div>
  );
}
