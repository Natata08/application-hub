import React from "react";
import WhyChooseCard from "./WhyChooseCard";
import Testimonials from "./Testimonial";
import OverviewImageCard from "./Overview";
import { Box } from "@mui/material";
import Introduction from "./Introduction";
import { useTheme } from "@mui/material/styles";

export default function HomePage() {
  const theme = useTheme();
  return (
    <Box>
      <Introduction />

      <div
        style={{
          width: "100vw",
          backgroundColor: theme.palette.background.cardLightGreen,
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
