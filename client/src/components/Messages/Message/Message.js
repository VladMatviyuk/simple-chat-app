import React from "react";
import propTypes from "prop-types";

import "./Message.css";
const Message = ({ message: { user, text, date }, name }) => {
  let isSendByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSendByCurrentUser = true;
  }

  return isSendByCurrentUser ? (
    <div>
      <div className="messageContainer justifyEnd">
        <p className="userName pr-10">{trimmedName}</p>
        <div className="messageBox backgroundBlue">
          <div className="messageText colorWhite">
            {text}
            <div className="messageTime">{date}</div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="messageContainer justifyStart">
        <div className="messageBox backgroundLight">
          <div className="messageText colorDark">
            {text}
            <div className="messageTime">{date}</div>
          </div>
        </div>
        <p
          className={
            user === "admin" ? "userName pl-10 adminMessage" : "userName pl-10"
          }
        >
          {user}
        </p>
      </div>
    </div>
  );
};

Message.propTypes = {
  message: propTypes.object.isRequired,
  name: propTypes.string,
};
export default Message;
