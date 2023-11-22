import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import Login from "./Pages/Login/login";
import Home from "./Pages/Home/index";

function App() {
  return (
    <>
     <BrowserRouter>
     <>
        <div className="App">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Home" element={<Home />} />
              </Routes>
        </div>
        </>
      </BrowserRouter>
    </>
  );
}

export default App;
