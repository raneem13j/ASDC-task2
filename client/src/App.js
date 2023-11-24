import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Login from "./Pages/Login/login";



function App() {
 

  return (
    <>
      <BrowserRouter>
        <>
          <div className="App">
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          </div>
        </>
      </BrowserRouter>
    </>
  );
}

export default App;
