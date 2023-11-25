import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Pages/Login/Login";
import Messenger from "./Pages/messenger/Messenger";

function App() {
  const userId = sessionStorage.getItem("Id");
  

  return (
    <>
      <BrowserRouter>
        
          <div className="App">
            <Routes>
            <Route path="/" element={<Login />}  />
            <Route
              path="/messenger"
              element={userId ? <Messenger /> : <Navigate to="/" />}
            />
            </Routes>
          </div>
        
      </BrowserRouter>
    </>
  );
}

export default App;
