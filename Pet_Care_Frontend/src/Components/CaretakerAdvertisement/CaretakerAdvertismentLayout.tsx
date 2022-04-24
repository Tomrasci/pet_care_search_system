import React, { useEffect } from "react";
import { useState } from "react";
import caretakerAdvertisementApi from "../../Api/caretakerAdvertisementApi";
import { ICaretakerAdvert } from "../../Interfaces/Caretaker/ICaretakerAdvert";
import { useParams } from "react-router-dom";
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";

const CaretakerAdvertisement = ({ currentUser }: any) => {
  const [advertDetails, setAdvertDetails] = useState<ICaretakerAdvert>();
  const { id } = useParams();

  useEffect(() => {
    const getAdvert = async () => {
      const advert = await caretakerAdvertisementApi.getCaretakerAdvertisement(
        Number(id)
      );
      setAdvertDetails(advert);
    };
    getAdvert();
  }, []);

  return (
    <Box marginY={5}>
      {advertDetails ? (
        <Box
          marginY={10}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* <Typography align="center" color="inherit" sx={{ fontSize: 32 }}>
            Caretaker advertisements
          </Typography>
          <Box sx={{ mt: 5 }}></Box> */}
          <Grid
            container
            direction="column"
            spacing={4}
            display="flex"
            justifyContent="center"
            sx={{ maxWidth: 1000 }}
          >
            <Box sx={{ maxWidth: 1000 }}>
              <Grid
                item
                xs={12}
                container
                style={{
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Grid item xs={12} md={6}>
                  <img
                    src={"http://localhost:3002/" + advertDetails.photo_link}
                    width="250"
                    height="150"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    color="inherit"
                    sx={{ fontSize: 24, fontWeight: 600 }}
                  >
                    {advertDetails.name + " " + advertDetails.surname}
                  </Typography>
                  <Box marginY={2}></Box>

                  <Typography sx={{ fontSize: 14 }}>
                    {advertDetails.age +
                      " " +
                      " years old." +
                      " " +
                      advertDetails.experience +
                      ". " +
                      advertDetails.day_price +
                      " eur per hour"}
                  </Typography>
                  <Box marginY={2}></Box>

                  <Typography color="inherit" sx={{ fontSize: 18 }}>
                    {advertDetails.description}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box marginY={2}></Box>
            <Divider />
            <Box marginY={2}></Box>

            <Box sx={{ maxWidth: 1000 }}>
              <Grid item xs={12} container>
                <Grid item xs={6}>
                  <Typography
                    color="inherit"
                    sx={{ fontSize: 20, fontWeight: 600 }}
                  >
                    Caretaker available services
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    color="inherit"
                    sx={{ fontSize: 16, fontWeight: 600 }}
                  >
                    Service
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} container>
                {advertDetails.services.map((service) => {
                  return (
                    <>
                      <Box marginY={2}></Box>
                      <Grid item xs={6}></Grid>
                      <Grid item xs={6}>
                        <Typography>{service}</Typography>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </Box>
            <Divider />
            <Box marginY={2}></Box>

            <Box sx={{ maxWidth: 1000 }}>
              <Grid item xs={12} container>
                <Grid item xs={6}>
                  <Typography
                    color="inherit"
                    sx={{ fontSize: 20, fontWeight: 600 }}
                  >
                    Available care of pets
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    color="inherit"
                    sx={{ fontSize: 16, fontWeight: 600 }}
                  >
                    Pet
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} container>
                {advertDetails.pets.map((pet) => {
                  return (
                    <>
                      <Box marginY={2}></Box>
                      <Grid item xs={6}></Grid>
                      <Grid item xs={6}>
                        <Typography>{pet}</Typography>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </Box>
            <Divider />
            <Box marginY={2}></Box>
            <Box sx={{ maxWidth: 1000 }}>
              <Grid item xs={12} container>
                <Grid item xs={6}>
                  <Typography
                    color="inherit"
                    sx={{ fontSize: 20, fontWeight: 600 }}
                  >
                    Languages
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    color="inherit"
                    sx={{ fontSize: 16, fontWeight: 600 }}
                  >
                    Language
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} container>
                {advertDetails.languages.map((language) => {
                  return (
                    <>
                      <Box marginY={2}></Box>
                      <Grid item xs={6}></Grid>
                      <Grid item xs={6}>
                        <Typography>{language}</Typography>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </Box>
            <Box marginY={2}></Box>

            <Divider />
            <Box marginY={2}></Box>
            <Box sx={{ maxWidth: 1000 }}>
              <Grid item xs={12} container>
                <Grid item xs={3}>
                  <Typography
                    color="inherit"
                    sx={{ fontSize: 20, fontWeight: 600 }}
                  >
                    Contact information
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    color="inherit"
                    sx={{ fontSize: 16, fontWeight: 600 }}
                  >
                    Languages
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  {advertDetails.languages.map((language) => {
                    return (
                      <>
                        <Typography>{language}</Typography>
                      </>
                    );
                  })}
                </Grid>
              </Grid>
            </Box>
            <Box marginY={2}></Box>

            <Divider />
          </Grid>
        </Box>
      ) : (
        <div>Loading</div>
      )}
    </Box>
  );
};

export default CaretakerAdvertisement;

{
  /* <Grid
                  item
                  xs={12}
                  container
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Grid item xs={4}></Grid>
                  <Grid item xs={8}></Grid>
                </Grid> */
}
{
  /* </Grid> */
}
