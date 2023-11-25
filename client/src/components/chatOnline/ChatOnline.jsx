import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";


function ChatOnline({onlineUsers,currentId}) {
 const [users, setUsers] = useState([]);
 const [onlineFriends, setOnlineFriends] = useState([]);

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

useEffect(() => {
  // Check if both users and onlineUsers are not empty before filtering
  if (users.length > 0 && onlineUsers.length > 0) {
    setOnlineFriends(
      users.filter((user) =>
        onlineUsers.some((onlineUser) => onlineUser.userId === user._id)
      )
    );
  }
}, [users, onlineUsers]);


  return (
    <div className="chatOnline">
      {onlineFriends?.map((o)=>(
        <div className="chatOnlineFriend" >
          <div className="chatOnlineImgContainer">
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o.username}</span>
        </div>
        ))}
    </div>
  )
}

export default ChatOnline
