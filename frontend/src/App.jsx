import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

import "./App.css";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import Dashboard from "./components/common/Dashboard";
import CourseContent from "./components/user/student/CourseContent";

export const UserContext = createContext();

function App() {
  const date = new Date().getFullYear();
  const [userData, setUserData] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user) {
          setUserData(user);
          setUserLoggedIn(true);
        }
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, userLoggedIn }}>
      <Router>
        <div className="App">
          <div className="content">
            <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route
    path="/dashboard"
    element={userLoggedIn ? <Dashboard /> : <Login />}
  />
  <Route
    path="/courseSection/:courseId/:courseTitle"
    element={
      userLoggedIn ? <CourseContent /> : <Login />
    }
  />
</Routes>

          </div>

          <footer className="bg-light text-center text-lg-start">
            <div className="text-center p-3">
              © {date} Copyright: Study App
            </div>
          </footer>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

