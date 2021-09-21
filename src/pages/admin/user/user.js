import React, { useState, useEffect } from "react";
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
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const tempRestaurants = await axios.get(`/user/`);
    setUser(tempRestaurants.data.users);
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
    axios.delete(`/user/delete/${id}`).then((data) => {
      fetchData();
      if (data.data.message === "Deleted successfully!") {
        toast.success(data.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.warning(data.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    });
  };

  return (
    <List>
      {user.map((item) => (
        <div>
          {item.role !== "admin" && (
            <ListItem key={item.name} button>
              <ListItemText
                primary={item.username}
                secondary={item.role}
                className={classes.Listtext}
              />
              <br />
              <IconButton onClick={() => onDelete(item._id)}>
                <DeleteIcon style={{ color: "white" }} />
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
          <Divider style={{ borderColor: "rgba(0,0,0,0.3)" }} light />
        </div>
      ))}
    </List>
  );
};

export default User;
