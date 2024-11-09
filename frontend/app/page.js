"use client";

import { useTheme } from "@mui/material/styles";
import HomePage from "../components/HomePage";

export default function Home() {
  const theme = useTheme();
  return (
    <>
      <HomePage />
    </>
  );
}