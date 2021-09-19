import React, { useState, useContext } from "react";
import { Container, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import axios from "../../utils/axios";
import UserContext from "../../context/UserContext";

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
  const { user } = useContext(UserContext);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [Error, setError] = useState("");

  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !image || !description) {
      setError("All fields are required");
    } else {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("image", image, image.name);
      formdata.append("description", description);
      formdata.append("owner", user._id);
      axios.post("/restaurant/create", formdata).then(() => {
        history.push("/");
      });
    }
  };

  return (
    <Container className={classes.Container} maxWidth={false}>
      <form className={classes.form} onSubmit={onSubmit}>
        <div
          style={{
            color: "white",
            fontSize: 18,
            height: 25,
            textAlign: "center",
          }}
        >
          ADD RESTAURANT
        </div>
        <div style={{ color: "red", height: 25 }}>{Error && Error}</div>
        <div style={{ marginBottom: 15 }}>
          <input
            placeholder="name"
            type="text"
            name="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={classes.field}
          />
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ color: "white", marginBottom: 20 }}
          />
          <textarea
            placeholder="description"
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={classes.field}
            style={{ height: 100 }}
          />
        </div>
        <Button
          className={classes.btn}
          variant="contained"
          fullWidth
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Signup;
