import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import ShowUsers from "../ShowUsers/ShowUsers";
import "./Chat.css";
import ScrollToBottom from "react-scroll-to-bottom";
import UsersList from "../UsersList/UsersList";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const handleShowUsers = () => {
    setShowUsers(!showUsers);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <InfoBar room={room} handleShowUsers={handleShowUsers} />
        <div className="content">
          <div className="left">
            {showUsers ? (
              <ShowUsers users={users} room={room}></ShowUsers>
            ) : null}

            <ScrollToBottom className="messages">
              <Messages messages={messages} name={name} />
            </ScrollToBottom>

            <Input
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </div>
          <div className="right">
            <UsersList users={users} room={room} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
