import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import "./messenger.css";
import { io } from "socket.io-client";

function Messenger() {
  // Retrieve user ID from session storage
  const userId = sessionStorage.getItem("Id");
  const [rooms, setRooms] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const scrollRef = useRef();
  const [addMode, setAddMode] = useState(false);
  const [newRoom, setNewRoom] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const [sendNotification, setSendNotification] = useState([]);
  const jwt = sessionStorage.getItem("token");
 
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
  // Logout functionality
  const handleLogout = () => {
    console.log("Logout");
    sessionStorage.clear("token");
    window.location.href = "/";
  };

  // Initialize socket connection and set up event listeners
  useEffect(() => {
    socket.current = io("ws://localhost:8900");

    // Join the room when component mounts
    if (currentChat) {
      socket.current.emit("joinRoom", currentChat._id);
    }

    // Listen for new messages
    socket.current.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Listen for notifications
    socket.current.on("notification", (notification) => {
      // Handle the notification as needed
      setSendNotification(notification);
      console.log("Notification received:", notification);
    });
  }, [currentChat]);

  // Add user to socket on component mount
  useEffect(() => {
    socket.current.emit("addUser", userId);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [userId, currentChat]);

  // Fetch conversations/rooms from the server
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/room/`);
        setRooms(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userId]);

  // Fetch messages for the current chat from the server
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/message/${currentChat?._id}`
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat, messages]);

  // Handle file change in the input
  const handleFileChange = (e) => {
    // Update the selected file when the file input changes
    setSelectedFile(e.target.files[0]);
  };

  // Handle message submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("roomId", currentChat._id);
    formData.append("senderId", userId);
    formData.append("text", newMessage);
    formData.append("file", selectedFile);

    try {
      const res = await axios.post("http://localhost:5000/message", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${jwt}`,
        },
      });

      setMessages([...messages, res.data]);

      // Emit the new message to the server
      socket.current.emit("sendMessage", {
        roomId: currentChat._id,
        message: res.data,
      });
      setNewMessage("");
      // Clear the selected file after submission
      setSelectedFile(null);
    } catch (err) {
      console.log(err);
    }
  };

  // Open the form to add a new room
  const handleOpenForm = () => {
    setAddMode(true);
  };

  // Handle adding a new room
  const handleAdd = async (e) => {
    e.preventDefault();
    const data = {
      roomName: newRoom,
    };
    try {
      const res = await axios.post(
        `http://localhost:5000/room/${userId}`,
        data, config
      );
      setRooms([...rooms, res.data]);
      setNewRoom("");
      setAddMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Scroll to the latest message when messages change
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 
  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <h2>Available Rooms</h2>
            <button className="chatSubmitButton1" onClick={handleOpenForm}>
              Add Room
            </button>
            {addMode && (
              <form>
                <input
                  className="chatMessageInput1"
                  type="text"
                  placeholder="Class Name"
                  name="levelName"
                  onChange={(e) => setNewRoom(e.target.value)}
                  value={newRoom}
                ></input>
                <button
                  type="submit"
                  className="chatSubmitButton2"
                  onClick={handleAdd}
                >
                  SAVE
                </button>
              </form>
            )}
            {rooms.map((r, index) => (
              <div key={index} onClick={() => setCurrentChat(r)}>
                <Conversation room={r} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m , index) => (
                    <div key={index} ref={scrollRef}>
                      <Message message={m} own={m.senderId === userId} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                  <input
                    className="chatMessageInput"
                    id="username"
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                  />
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            
            <div>
            <h2>Notification</h2>
            {sendNotification.senderId !== userId && (
            <p>{sendNotification.message}</p>
            )}
            </div>
           
            <button className="chatSubmitButton4" onClick={handleLogout}>
              Logout
            </button>
            <h2>Online Users</h2>
            {currentChat ? (
              <>
            
            <ChatOnline onlineUsers={onlineUsers} currentChat={currentChat} />
            </>
            ) : (
              <span className="noConversationText1">
                Open a conversation to see online users
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
