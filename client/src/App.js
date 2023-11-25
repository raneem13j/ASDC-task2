import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Messenger from "./Pages/messenger/Messenger";
import Notfound from "./Pages/NotFoundPage/NotFound";

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
            <Route path="*" element={<Notfound />} />
            </Routes>
          </div>
        
      </BrowserRouter>
    </>
  );
}

export default App;
