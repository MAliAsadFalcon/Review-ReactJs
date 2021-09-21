import React from "react";
import Skeleton from "@mui/material/Skeleton";

import { List, ListItem, Typography } from "@mui/material";

const RestaurantViewSkeleton = () => {
  return (
    <div style={{ marginLeft: "2rem" }}>
      <div
        style={{
          marginTop: "2rem",
        }}
      >
        <Skeleton
          animation="wave"
          height={25}
          width="12%"
          style={{ backgroundColor: "grey" }}
        />
      </div>
      <Skeleton
        animation="wave"
        height={25}
        width="7%"
        style={{ backgroundColor: "grey", marginBottom: "2rem" }}
      />
      <Skeleton
        sx={{ height: "50vh", width: "40vw" }}
        animation="wave"
        variant="rectangular"
        style={{ backgroundColor: "grey", marginBottom: "2rem" }}
      />
      <Skeleton
        animation="wave"
        height={25}
        width="80%"
        style={{ backgroundColor: "grey" }}
      />
      <Skeleton
        animation="wave"
        height={25}
        width="45%"
        style={{ backgroundColor: "grey", marginBottom: "2rem" }}
      />
      <List
        sx={{
          width: "95%",
          bgcolor: "rgba(0, 0, 0, 0.8)",
          color: "white",
        }}
      >
        <Typography style={{ marginLeft: "1rem", marginBottom: 7 }}>
          <Skeleton
            animation="wave"
            height={16}
            width="20%"
            style={{ backgroundColor: "grey" }}
          />
        </Typography>
        <div>
          <ListItem alignItems="flex-start">
            <Skeleton
              animation="wave"
              height={16}
              width="40%"
              style={{ backgroundColor: "grey" }}
            />
          </ListItem>
        </div>
      </List>
    </div>
  );
};

export default RestaurantViewSkeleton;
