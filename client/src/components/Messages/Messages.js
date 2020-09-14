import React from "react";
import propTypes, { object } from "prop-types";

import "./Messages.css";

import Message from "./Message/Message";

const Messages = ({ messages, name }) => (
  <React.Fragment>
    {messages.map((message, i) => (
      <Message message={message} name={name} key={i} />
    ))}
  </React.Fragment>
);

Messages.propTypes = {
  messages: propTypes.arrayOf(object),
  name: propTypes.string,
};

export default Messages;
