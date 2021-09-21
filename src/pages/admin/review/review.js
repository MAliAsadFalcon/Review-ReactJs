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
import StarIcon from "@mui/icons-material/Star";
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

const Review = () => {
  const classes = useStyles();

  const [review, setReview] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const tempRestaurants = await axios.get(`/review/`);
    setReview(tempRestaurants.data.review);
  };

  const onDelete = async (id) => {
    axios.delete(`/review/delete/${id}`).then((data) => {
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
      {review.map((item) => (
        <div>
          <ListItem key={item.name} button>
            <ListItemText
              primary={
                <div>
                  {item.user.username} ({item.star}
                  <StarIcon style={{ fontSize: 14 }} />)
                </div>
              }
              secondary={item.comments}
              className={classes.Listtext}
            />
            <br />
            <IconButton onClick={() => onDelete(item._id)}>
              <DeleteIcon style={{ color: "white" }} />
            </IconButton>
          </ListItem>
          <Divider light />
        </div>
      ))}
    </List>
  );
};

export default Review;
