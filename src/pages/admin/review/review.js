import React, { useState, useEffect, useRef } from "react";
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
import { CircularProgress } from "@mui/material";
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
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState("");
  const [listloading, setListloading] = useState(true);
  const lottieContainer = useRef(null);

  const [review, setReview] = useState([]);
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
    const tempRestaurants = await axios.get(`/review/`);
    setReview(tempRestaurants.data.review);
    setListloading(false);
  };

  const onDelete = async (id) => {
    setLoading(true);
    axios.delete(`/review/delete/${id}`).then((data) => {
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
      {review.length === 0 && !listloading && (
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
        review.map((item) => (
          <div>
            <ListItem key={item.name}>
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
            </ListItem>
            <Divider style={{ borderColor: "rgba(0,0,0,0.3)" }} light />
          </div>
        ))
      )}
    </List>
  );
};

export default Review;
