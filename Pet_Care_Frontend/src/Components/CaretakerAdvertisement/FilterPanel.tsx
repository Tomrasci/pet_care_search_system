import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import FilterCheckbox from "./FilterCheckbox";
import PriceSlider from "./PriceSlider";

const FilterPanel = ({
  services,
  changeCheckedServices,
  pets,
  changeCheckedPets,
  selectedPrice,
  changePrice,
  languages,
  changeCheckedLanguages,
}: {
  services: { id: number; checked: boolean; label: string }[];
  changeCheckedServices: (id: number) => void;
  pets: { id: number; checked: boolean; label: string }[];
  changeCheckedPets: (id: number) => void;
  selectedPrice: number[];
  changePrice: (event: any, value: number[]) => void;
  languages: { id: number; checked: boolean; label: string }[];
  changeCheckedLanguages: (id: number) => void;
}) => {
  return (
    <>
      <Grid item xs={12}>
        <Typography
          component="h1"
          variant="h4"
          color="#793209"
          fontSize={20}
          fontWeight={500}
        >
          Services
        </Typography>
      </Grid>
      <Box marginY={2}></Box>

      {services.map((service: any) => {
        return (
          <Grid item xs={12}>
            <FilterCheckbox
              key={service.id}
              type={service}
              changeChecked={changeCheckedServices}
            ></FilterCheckbox>
          </Grid>
        );
      })}
      <Box marginY={2}></Box>

      <Grid item xs={12}>
        <Typography
          component="h1"
          variant="h4"
          color="#793209"
          fontSize={20}
          fontWeight={500}
        >
          Pets
        </Typography>
      </Grid>
      <Box marginY={2}></Box>

      {pets.map((pet: any) => {
        return (
          <Grid item xs={12}>
            <FilterCheckbox
              key={pet.id}
              type={pet}
              changeChecked={changeCheckedPets}
            ></FilterCheckbox>
          </Grid>
        );
      })}
      <Box marginY={2}></Box>

      <Box marginY={2}></Box>

      <Grid item xs={12}>
        <Typography
          component="h1"
          variant="h4"
          color="#793209"
          fontSize={20}
          fontWeight={500}
        >
          Languages
        </Typography>
      </Grid>
      <Box marginY={2}></Box>

      {languages.map((language: any) => {
        return (
          <Grid item xs={12}>
            <FilterCheckbox
              key={language.id}
              type={language}
              changeChecked={changeCheckedLanguages}
            ></FilterCheckbox>
          </Grid>
        );
      })}
      <Box marginY={2}></Box>

      <Grid item xs={12}>
        <Typography
          component="h1"
          variant="h4"
          color="#793209"
          fontSize={20}
          fontWeight={500}
        >
          Hour price (Eur)
        </Typography>
      </Grid>
      <Box marginY={2}></Box>
      <PriceSlider
        value={selectedPrice}
        changePrice={changePrice}
      ></PriceSlider>
    </>
  );
};

export default FilterPanel;
