import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Unauth from "./pages/unAuth/index";
import User from "./pages/user/index";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import UserContext from "./context/UserContext";

function App() {
  const { user } = useContext(UserContext);
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Router>{user.role ? user.role === "user" && <User /> : <Unauth />}</Router>
  );
}

export default App;
