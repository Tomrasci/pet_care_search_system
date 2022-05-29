import { Box } from "@mui/material";
import React from "react";
import pic from "../Images/pets.jpg";
import "./Home.css";
import ImageSlider from "./ImageSlider";

export default function Home() {
  return (
    <>
      <div className="home-container">
        <h1>Pet Care Search System</h1>
      </div>
      <div className="simpleTextContainer">
        <h2>Find your perfect caretaker or your dream job!</h2>
      </div>
      <ImageSlider />
      <Box marginY={20}></Box>
    </>
  );
}
