import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Pages/Login/Login";
import Messenger from "./Pages/messenger/Messenger";

function App() {
  const userId = sessionStorage.getItem("Id");
  const [user, setUser] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${userId}`
        );
        setUser(response.data);
         console.log("user", response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);


  return (
    <>
      <BrowserRouter>
        
          <div className="App">
            <Routes>
            <Route path="/" element={<Login />}  />
            <Route
              path="/messenger"
              element={userId ? <Messenger user={user} /> : <Navigate to="/" />}
            />
            </Routes>
          </div>
        
      </BrowserRouter>
    </>
  );
}

export default App;
