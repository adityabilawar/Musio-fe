import React, { useContext } from "react";
import { IoMdExit } from "react-icons/io";
import "../css/instrument.css";
import { Context } from "../states/Provider";
import { useNavigate } from "react-router-dom";

export default function Instrument() {
  const navigate = useNavigate();
  const [, dispatch] = useContext(Context);
  return (
    <div class="background d-flex align-items-center flex-column">
      <div class="title">Select your instrument</div>
      <IoMdExit
        className="sign-out"
        size={40}
        color="white"
        onClick={() => {
          dispatch({
            type: "LOG_OUT",
          });
          navigate("/login");
        }}
      />
      <div class="d-flex align-items-center flex-column">
        <select
          multiple
          class="form-select custom-select mb-5"
          aria-label="Instrument select"
          size="6"
        >
          <option value="0">🎤 Vocal</option>
          <option value="1">🎷 Saxophone</option>
          <option value="2">🎸 Guitar</option>
          <option value="3">🎹 Piano</option>
          <option value="4">🎻 Violin</option>
          <option value="5">🥁 Drum</option>
        </select>
        <button
          type="button"
          class="btn btn-light"
          onClick={() => {
            navigate("/meeting");
          }}
        >
          Join now
        </button>
      </div>
    </div>
  );
}
