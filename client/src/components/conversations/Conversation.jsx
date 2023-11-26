import React, { useEffect, useState } from "react";
import axios from "axios";
import "./conversation.css";

/**
 * Component representing a conversation in the chat application.
 * @param {Object} room - The room object containing information about the conversation.
 */
function Conversation(room) {
  // Get the current user's ID from the session storage.
  const currentId = sessionStorage.getItem("Id");

  // Check if the current user is in the room.
  const isCurrentUserInRoom = room.room.userId.includes(currentId);

  // State to track the join status.
  const [join, setJoin] = useState("");

  /**
   * Handles the form submission to join the room.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      userId: currentId,
    };
    try {
      // Make a PUT request to join the room.
      const res = await axios.put(`http://localhost:5000/room/${room.room._id}`, data);
      setJoin(res.data);
      // Reload the page to reflect the updated room status.
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  // Render the conversation component.
  return (
    <div className="conversation">
      {/* Display the room name */}
      <span className="conversationName">{room.room.roomName}</span>

      {/* Display either an empty span or a join button based on the user's presence in the room. */}
      {isCurrentUserInRoom ? (
        <span> </span>
      ) : (
        <button className="chatSubmitButton2" onClick={handleSubmit}>
          Join
        </button>
      )}
    </div>
  );
}

export default Conversation;
