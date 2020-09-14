import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import "./Join.css";
const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  // For invite link
  let { roomInvite } = useParams();
  useEffect(() => {
    setRoom(roomInvite);
  }, [roomInvite]);

  return (
    <div className="wrapperJoin">
      <div className="containerJoin">
        <h1 className="header">Join</h1>
        <div className="inputJoinWrapper">
          <input
            placeholder="Name"
            className="inputJoin"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="inputJoinWrapper">
          <input
            placeholder="Room"
            className="inputJoin"
            type="text"
            onChange={(e) => {
              setRoom(e.target.value);
            }}
            value={typeof roomInvite !== undefined ? roomInvite : ""}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${roomInvite ? roomInvite : room}`}
        >
          <button className="btnJoin" type="submit">
            Sign in
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
