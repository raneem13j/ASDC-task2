// Importing necessary components from react-router-dom for routing.
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Importing components for different pages.
import Login from "./Pages/Login/Login";
import Messenger from "./Pages/messenger/Messenger";
import Notfound from "./Pages/NotFoundPage/NotFound";

// Main component rendering different pages based on route.
function App() {
  // Retrieving user ID from session storage.
  const userId = sessionStorage.getItem("Id");

  // Rendering the application structure with routing logic.
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
            {/* Route for the login page */}
            <Route path="/" element={<Login />} />
            
            {/* Route for the messenger page, with conditional rendering based on user ID */}
            <Route
              path="/messenger"
              element={userId ? <Messenger /> : <Navigate to="/" />}
            />

            {/* Route for any other paths, rendering the NotFound page */}
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

// Exporting the App component as the default export.
export default App;
