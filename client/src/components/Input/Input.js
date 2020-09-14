import React from "react";
import propTypes from "prop-types";

import "./Input.css";

const Input = ({ message, setMessage, sendMessage }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
    />
    <button className="sendBtn" onClick={(e) => sendMessage(e)}>
      Send
    </button>
  </form>
);

Input.propTypes = {
  message: propTypes.string.isRequired,
  setMessage: propTypes.func.isRequired,
  sendMessage: propTypes.func.isRequired,
};

export default Input;
