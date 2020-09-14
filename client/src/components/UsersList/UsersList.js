import React, { useRef } from "react";
import propTypes, { object } from "prop-types";

import "./UsersList.css";
const UsersList = ({ users, room }) => {
  const inputRefLink = useRef(null);
  const url = window.location.href.split("chat")[0];

  function copyLinkInvite() {
    inputRefLink.current.select();
    document.execCommand("copy");
  }

  return (
    <React.Fragment>
      <div className="usersList">
        <h3>Users online:</h3>
        {users.map((user, key) => (
          <span key={key} className="user">
            {user.name}
          </span>
        ))}
      </div>
      {room !== "" && (
        <input
          ref={inputRefLink}
          type="text"
          defaultValue={`${url}invite/${room}`}
          className="hideInput"
        />
      )}

      <div className="btnInvite">
        <div className="btn" onClick={copyLinkInvite}>
          Invite link
        </div>
      </div>
    </React.Fragment>
  );
};

UsersList.propTypes = {
  users: propTypes.arrayOf(object).isRequired,
  room: propTypes.string.isRequired,
};

export default UsersList;
