import React, { useContext } from "react";
import Routes from "./utils/routes";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import UserContext from "./context/UserContext";
import axios from "./utils/axios";

function App() {
  axios.defaults.withCredentials = true;
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    checkLogin();
    AOS.init();
  }, []);

  const checkLogin = async () => {
    const result = await axios.get("/user/loggedin");
    if (!result.data.error) {
      setUser(result.data.user);
    }
  };

  return <Routes />;
}

export default App;
