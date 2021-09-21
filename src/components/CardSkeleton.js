import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

function Media() {
  return (
    <Card
      style={{
        backgroundColor: "#4B4B4B",
        color: "white",
        height: 385,
        width: 350,
        margin: 20,
      }}
    >
      <CardHeader
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6, backgroundColor: "grey" }}
          />
        }
        subheader={
          <Skeleton
            animation="wave"
            height={10}
            width="40%"
            style={{ backgroundColor: "grey" }}
          />
        }
        style={{ marginBottom: 25, marginTop: 20 }}
      />
      {
        <Skeleton
          sx={{ height: 190 }}
          animation="wave"
          variant="rectangular"
          style={{ backgroundColor: "grey" }}
        />
      }

      <CardContent>
        {
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
              style={{ backgroundColor: "grey" }}
            />
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ backgroundColor: "grey" }}
            />
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginTop: 32, backgroundColor: "grey" }}
            />
          </React.Fragment>
        }
      </CardContent>
    </Card>
  );
}

export default function CardSkeleton() {
  return (
    <div>
      <Media loading />
    </div>
  );
}
