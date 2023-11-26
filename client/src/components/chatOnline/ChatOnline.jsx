import axios from "axios";
import { useEffect, useState } from "react";


import "./chatOnline.css";

// Functional component rendering online friends in the chat.
function ChatOnline({ onlineUsers, currentId }) {
  // States to manage the list of all users and online friends.
  const [users, setUsers] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  // Fetching all users from the server on component mount.
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/user`);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllUsers();
  }, []);

  // Filtering online friends based on the provided onlineUsers and users.
  useEffect(() => {
    // Check if both users and onlineUsers are not empty before filtering.
    if (users.length > 0 && onlineUsers.length > 0) {
      setOnlineFriends(
        users.filter((user) =>
          onlineUsers.some((onlineUser) => onlineUser.userId === user._id)
        )
      );
    }
  }, [users, onlineUsers]);

  // Rendering the online friends in the chat interface.
  return (
    <div className="chatOnline">
      {onlineFriends?.map((o, index) => (
        <div className="chatOnlineFriend" key={index}>
          <div className="chatOnlineImgContainer">
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o.username}</span>
        </div>
      ))}
    </div>
  );
}

// Exporting the ChatOnline component as the default export.
export default ChatOnline;
