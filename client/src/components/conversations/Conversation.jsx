import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

function Conversation(room) {
  const currentId = sessionStorage.getItem("Id");
  const isCurrentUserInRoom = room.room.userId.includes(currentId);
  const [join, setJoin] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      userId: currentId,
    };
    try {
      const res = await axios.put(`http://localhost:5000/room/${room.room._id}`);
      setJoin([res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <div className="conversation">
      <span className="conversationName">{room.room.roomName}</span>
      {isCurrentUserInRoom ? (
        <span> </span>
      ) : (
        <button className="chatSubmitButton2" onClick={handleSubmit}>Join</button>
      )}
    </div>
   
    </>
  );
}

export default Conversation;
