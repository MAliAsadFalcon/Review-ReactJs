import React, { useState } from "react";
import { Container, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link, useHistory } from "react-router-dom";
import axios from "../../utils/axios";

const UseStyles = makeStyles({
  field: {
    width: 292.5,
    height: 30,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
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
    backgroundColor: "#2a2a2a",
  },
});

const Signup = () => {
  const classes = UseStyles();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [role, setRole] = useState("N/A");
  const [Error, setError] = useState("");

  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      role === "N/A"
    ) {
      setError("All fields are required");
    } else if (password !== confirmPassword) {
      setError("Password does not match");
    } else {
      setError("");

      const user = {
        username: username,
        email: email,
        password: confirmPassword,
        role: role,
      };
      console.log("user: ", user);
      axios.post("/user/signup", user).then((data) => {
        history.push("/login");
      });
    }
  };

  return (
    <Container className={classes.Container} maxWidth={false}>
      <form className={classes.form} onSubmit={onSubmit}>
        <div style={{ color: "red", height: 25 }}>{Error && Error}</div>
        <div style={{ marginBottom: 15 }}>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={classes.field}
          />
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
          <input
            placeholder="Confirm Password"
            type="password"
            name="password"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            className={classes.field}
          />
          <select
            style={{ width: 300, height: 30 }}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            name="role"
          >
            <option value="N/A" disabled>
              --Select a Role--
            </option>
            <option value="user">Restaurant Customer</option>
            <option value="owner">Restaurant Owner</option>
          </select>
          <Link to="/login">Click here to login</Link>
        </div>
        <Button
          className={classes.btn}
          variant="contained"
          fullWidth
          type="submit"
        >
          Signup
        </Button>
      </form>
    </Container>
  );
};

export default Signup;
