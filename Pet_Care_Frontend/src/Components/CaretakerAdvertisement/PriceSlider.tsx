import { Box, Slider } from "@mui/material";
import React from "react";

const PriceSlider = ({ value, changePrice }: any) => {
  return (
    <Box>
      <Slider
        value={value}
        onChange={changePrice}
        valueLabelDisplay="auto"
        min={1}
        max={100}
      ></Slider>
    </Box>
  );
};

export default PriceSlider;
