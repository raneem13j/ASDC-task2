import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import io from "socket.io-client";
import "./App.css";
import Login from "./Pages/Login/login";
import Home from "./Pages/Home/home";

const socket = io.connect("http://localhost:4000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  return (
    <>
      <BrowserRouter>
        <>
          <div className="App">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/Home"
                element={
                  <Home
                    username={username}
                    setUsername={setUsername}
                    room={room}
                    setRoom={setRoom}
                    socket={socket}
                  />
                }
              />
            </Routes>
          </div>
        </>
      </BrowserRouter>
    </>
  );
}

export default App;
