import React, { useRef } from "react";
import propTypes, { object } from "prop-types";

import "./ShowUsers.css";

const ShowUsers = ({ users, room }) => {
  const inputRef = useRef(null);
  const url = window.location.href.split("chat")[0];

  function copyLinkInvite() {
    inputRef.current.select();
    document.execCommand("copy");
  }
  return (
    <div className="showUsers">
      {users.map((user, key) => (
        <span className="user" key={key}>
          {user.name}
        </span>
      ))}
      <span className="link" onClick={copyLinkInvite}>
        Invite link
      </span>
      <input
        ref={inputRef}
        type="text"
        defaultValue={`${url}invite/${room}`}
        className="hideInput"
      />
    </div>
  );
};

ShowUsers.propTypes = {
  users: propTypes.arrayOf(object).isRequired,
  room: propTypes.string.isRequired,
};

export default ShowUsers;
