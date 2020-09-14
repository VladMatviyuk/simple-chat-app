import React from "react";
import propTypes from "prop-types";

import "./InfoBar.css";

const InfoBar = ({ room, handleShowUsers }) => (
  <div className="infoBar">
    <div className="nameRoom">{room}</div>

    <div className="usersInRoom" onClick={handleShowUsers}>
      Users online
    </div>

    <div className="leaveRoom">
      <a href="/">Leave</a>
    </div>
  </div>
);

InfoBar.propTypes = {
  room: propTypes.string.isRequired,
  handleShowUsers: propTypes.func.isRequired,
};
export default InfoBar;
