import React, { useState, useEffect, useRef } from "react";
import axios from "../../../utils/axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import { Button, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListItemSkeleton from "../../../components/ListItemSkeleton";
import lottie from "lottie-web";
import { Typography } from "@mui/material";

toast.configure({ limit: 1 });
const useStyles = makeStyles(() => {
  return {
    Listtext: {
      color: "white",
      "& .css-83ijpv-MuiTypography-root": {
        color: " rgba(255, 255, 255, 0.6)",
      },
    },
    form: {
      width: 300,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      padding: 50,
      margin: "auto",
    },
    field: {
      width: 292.5,
      height: 30,
      marginBottom: 20,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
  };
});

const User = () => {
  const classes = useStyles();

  const [user, setUser] = useState([]);
  const [openEditModel, setOpenEditModel] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [Error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [listloading, setListloading] = useState(true);
  const [loadingId, setLoadingId] = useState("");
  const lottieContainer = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    lottie.loadAnimation({
      container: lottieContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../../utils/empty.json"),
    });
    return () => {
      lottie.destroy();
    };
    // eslint-disable-next-line
  });

  const fetchData = async () => {
    const tempRestaurants = await axios.get(`/user/`);
    setUser(tempRestaurants.data.users);
    setListloading(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      setError("Username can't be empty.");
    } else {
      setError("");

      const user = {
        username: username,
        role: role,
      };
      axios.put(`/user/edit/${userId}`, user).then(() => {
        fetchData();
        setOpenEditModel(false);
      });
    }
  };

  const onDelete = async (id) => {
    setLoading(true);
    axios.delete(`/user/delete/${id}`).then((data) => {
      fetchData();
      if (data.data.message === "Deleted successfully!") {
        toast.success(data.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
          pauseOnHover: false,
        });
      } else {
        toast.warning(data.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
          pauseOnHover: false,
        });
      }
      setTimeout(function () {
        setLoading(false);
      }, 2300);
    });
  };

  return (
    <List>
      {!user.find((item) => item.role !== "admin") && !listloading && (
        <>
          <div
            style={{
              height: 190,
              width: 190,
              margin: "auto",
            }}
            className="lottieContainer"
            ref={lottieContainer}
          ></div>
          <Typography
            style={{
              textAlign: "center",
              marginLeft: -5,
            }}
          >
            Empty
          </Typography>
        </>
      )}

      {listloading ? (
        <ListItemSkeleton />
      ) : (
        user.map((item) => (
          <div>
            {item.role !== "admin" && (
              <ListItem key={item.name}>
                <ListItemText
                  primary={item.username}
                  secondary={item.role}
                  className={classes.Listtext}
                />
                <br />
                <IconButton
                  onClick={() => {
                    setLoadingId(item._id);
                    onDelete(item._id);
                  }}
                >
                  {loading && item._id === loadingId ? (
                    <CircularProgress size={20} />
                  ) : (
                    <DeleteIcon style={{ color: "white" }} />
                  )}
                </IconButton>
                <IconButton
                  onClick={() => {
                    setOpenEditModel(true);
                    setUsername(item.username);
                    setRole(item.role);
                    setUserId(item._id);
                  }}
                >
                  <EditIcon style={{ color: "white" }} />
                </IconButton>
                <Divider style={{ borderColor: "rgba(0,0,0,0.3)" }} light />
                <Dialog
                  onClose={() => setOpenEditModel(false)}
                  open={openEditModel}
                  className={classes.Container}
                >
                  <form className={classes.form} onSubmit={onSubmit}>
                    <div style={{ color: "red", height: 25 }}>
                      {Error && Error}
                    </div>
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
                        placeholder={item.email}
                        disabled
                        type="email"
                        name="email"
                        className={classes.field}
                      />
                      <input
                        placeholder="******"
                        disabled
                        type="password"
                        name="password"
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
                    </div>
                    <Button
                      className={classes.btn}
                      variant="contained"
                      fullWidth
                      type="submit"
                    >
                      Update
                    </Button>
                  </form>
                </Dialog>
              </ListItem>
            )}
          </div>
        ))
      )}
    </List>
  );
};

export default User;
