import React from "react";
import pic from "../Images/pets.jpg";
import "./Home.css";
import ImageSlider from "./ImageSlider";

export default function Home() {
  return (
    <>
      <div className="home-container">
        <h1>Pet Care Seach System</h1>
        <p>Welcome!</p>
      </div>
      <div className="simpleTextContainer">
        <h2>Find your dream job or a person for your pet!</h2>
      </div>
      <ImageSlider />
    </>
  );
}
