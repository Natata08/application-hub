import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const OverviewImageCard = () => {
  return (
    <Card
      style={{
        maxWidth: "500px",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <CardContent>
        <Typography variant="h4" component="p" color="#264240">
          Overview
        </Typography>
        <div
          style={{
            height: "200px",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
            marginTop: "10px",
          }}
        >
          <Typography
            variant="body2"
            color="#000"
            style={{ padding: "80px 0" }}
          >
            Placeholder: we will place a picture of how does this app work,
            example just an image to show how
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewImageCard;
