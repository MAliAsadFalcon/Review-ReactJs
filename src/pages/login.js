import React, { useState } from "react";
import { Container, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import axios from "../utils/axios";

const UseStyles = makeStyles({
  field: {
    width: 292.5,
    height: 30,
    marginBottom: 20,
  },
  btn: {
    fontSize: 18,
    letterSpacing: 2,
    padding: 10,
  },
  form: {
    width: 300,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 50,
    margin: "auto",
    marginTop: 50,
  },
  Container: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    background: "url('/assets/BG.jpg') center center / cover no-repeat fixed",
  },
});

const Login = () => {
  const classes = UseStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      setError("Field Can't be empty");
    } else {
      setError("");

      const credentials = {
        email: email,
        password: password,
      };

      axios.post("/user/login", credentials).then((res) => {
        if (res.data !== "Successfully Authenticated") {
          setError(res.data);
        }
      });
    }
  };

  return (
    <div>
      <Container className={classes.Container} maxWidth={false}>
        <form className={classes.form} onSubmit={onSubmit}>
          <div style={{ color: "red", height: 25 }}>{Error && Error}</div>
          <div style={{ marginBottom: 15 }}>
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={classes.field}
            />
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classes.field}
            />
            <Link to="/signup">Click here to signup</Link>
          </div>
          <Button
            className={classes.btn}
            variant="contained"
            fullWidth
            type="submit"
          >
            Login
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Login;
