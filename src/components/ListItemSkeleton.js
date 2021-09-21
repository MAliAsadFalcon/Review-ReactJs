import React from "react";
import { ListItem, Skeleton, Divider, ListItemText } from "@mui/material";

const ListItemSkeleton = () => {
  return (
    <>
      <ListItem>
        <ListItemText
          primary={
            <Skeleton
              animation="wave"
              height={16}
              width="12%"
              style={{ backgroundColor: "grey" }}
            />
          }
          secondary={
            <Skeleton
              animation="wave"
              height={16}
              width="25%"
              style={{ backgroundColor: "grey" }}
            />
          }
        />
      </ListItem>
      <ListItem>
        <Divider style={{ borderColor: "rgba(0,0,0,0.3)" }} light />
        <ListItemText
          primary={
            <Skeleton
              animation="wave"
              height={15}
              width="12%"
              style={{ backgroundColor: "grey" }}
            />
          }
          secondary={
            <Skeleton
              animation="wave"
              height={16}
              width="25%"
              style={{ backgroundColor: "grey" }}
            />
          }
        />
      </ListItem>
      <ListItem>
        <Divider style={{ borderColor: "rgba(0,0,0,0.3)" }} light />
        <ListItemText
          primary={
            <Skeleton
              animation="wave"
              height={16}
              width="12%"
              style={{ backgroundColor: "grey" }}
            />
          }
          secondary={
            <Skeleton
              animation="wave"
              height={16}
              width="25%"
              style={{ backgroundColor: "grey" }}
            />
          }
        />
      </ListItem>
    </>
  );
};

export default ListItemSkeleton;
