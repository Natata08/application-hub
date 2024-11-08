import React from "react";
import WhyChooseCard from "./WhyChoosecard";
import Testimonials from "./Testimonial";
import OverviewImageCard from "./Overview";
import { Box } from "@mui/material";
import Introduction from "./Introduction";

export default function HomePage() {
  return (
    <Box>
      <Introduction />

      <div
        style={{
          width: "100vw",
          backgroundColor: "#D2E8D4",
          borderRadius: "100px 0 0 0",
          padding: "40px 0",
          color: "white",
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          margin: "20px 0",
        }}
      >
        <WhyChooseCard />
        <OverviewImageCard />
      </div>

      <Testimonials />
    </Box>
  );
}
