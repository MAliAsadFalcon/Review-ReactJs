import React, { useContext, useState } from "react";
import Routes from "./utils/routes";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import UserContext from "./context/UserContext";
import axios from "./utils/axios";

function App() {
  axios.defaults.withCredentials = true;

  const [Loading, setLoading] = useState(true);
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
    setLoading(false);
  };

  return <Routes Loading={Loading} />;
}

export default App;
