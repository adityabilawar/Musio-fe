import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../states/Provider";
import axios from "axios";
import { isEmpty } from "lodash";

export default function Login() {
  const navigate = useNavigate();
  const [, dispatch] = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({ username: "", password: "" });

  const onLogin = (e) => {
    e.preventDefault();

    axios
      .post("https://tohack-2022.herokuapp.com/users/login", {
        username,
        password,
      })
      .then((res) => {
        dispatch({
          type: "LOG_IN",
          userData: res.data,
        });
        navigate("/");
      })
      .catch((error) => {
        setFormError(error.response.data);
      });
  };

  return (
    <div className="container">
      <form>
        <div className="form-group">
          <label for="usernameInput">Username</label>
          <input
            type="text"
            className={`form-control ${
              isEmpty(formError.username) ? "" : "is-invalid"
            }`}
            id="usernameInput"
            aria-describedby="emailHelp"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <div
            id="validationServerUsernameFeedback"
            className="invalid-feedback"
          >
            {formError.username}
          </div>
        </div>

        <div className="form-group">
          <label for="passwordInput">Password</label>
          <input
            type="password"
            className={`form-control ${
              isEmpty(formError.password) ? "" : "is-invalid"
            }`}
            id="passwordInput"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            id="validationServerPasswordFeedback"
            className="invalid-feedback"
          >
            {formError.password}
          </div>
        </div>

        <button className="btn btn-primary" onClick={onLogin}>
          Login
        </button>
      </form>
    </div>
  );
}
