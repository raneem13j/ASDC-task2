import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import "./messenger.css";

function Messenger() {
  const userId = sessionStorage.getItem("Id");
  const [rooms, setRooms] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/room/`
        );
        setRooms(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userId]);

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
  }, [currentChat]);

  const handleFileChange = (e) => {
    // Update the selected file when the file input changes
    setSelectedFile(e.target.files[0]);
  };


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
        },
      });

      setMessages([...messages, res.data]);

      console.log(messages)
      setNewMessage("");
      // Clear the selected file after submission
      setSelectedFile(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <button className="chatSubmitButton1">Add Room</button>
            {rooms.map((r) => (
              <div onClick={() => setCurrentChat(r)}>
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
                  {messages.map((m) => (
                    <div ref={scrollRef} >
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
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
