import axios from "axios";
import { useEffect, useState } from "react";


import "./chatOnline.css";

// Functional component rendering online friends in the chat.
function ChatOnline({ onlineUsers, currentChat }) {
  // States to manage the list of all users and online friends.
  const [users, setUsers] = useState([]);


  // Fetching all users from the server on component mount.
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/room/roomUsers/${currentChat?._id}`);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllUsers();
  }, [currentChat]);


  // Rendering the online friends in the chat interface.
  return (
    <div className="chatOnline">
      {users.map((user) => (
        <div className="chatOnlineFriend" key={user._id}>
          <div className="chatOnlineImgContainer">
            {onlineUsers.some((onlineUser) => onlineUser.userId === user._id) ? (
              <div className="chatOnlineBadge"> </div>
            ) : null}
          </div>
          <span className="chatOnlineName">{user.username}</span>
        </div>
      ))}
    </div>
  );
}

export default ChatOnline;


