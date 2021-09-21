import React, { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({ limit: 1 });
const useStyles = makeStyles(() => {
  return {
    Listtext: {
      color: "white",
      "& .css-83ijpv-MuiTypography-root": {
        color: " rgba(255, 255, 255, 0.6)",
        width: 350,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
  };
});

const Restaurant = () => {
  const classes = useStyles();

  const [restaurant, setRestaurant] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const tempRestaurants = await axios.get(`/restaurant/`);
    setRestaurant(tempRestaurants.data.restaurant);
  };

  const onDelete = async (id) => {
    axios.delete(`/restaurant/delete/${id}`).then((data) => {
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
      {restaurant.map((item) => (
        <div>
          <ListItem key={item.name} button>
            <ListItemText
              primary={item.name}
              secondary={item.description}
              className={classes.Listtext}
            />
            <br />
            <IconButton onClick={() => onDelete(item._id)}>
              <DeleteIcon style={{ color: "white" }} />
            </IconButton>
          </ListItem>
          <Divider style={{ borderColor: "rgba(0,0,0,0.3)" }} light />
        </div>
      ))}
    </List>
  );
};

export default Restaurant;
