import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import caretakerAdvertisementApi from "../../Api/caretakerAdvertisementApi";
import { ICaretakerAdvert } from "../../Interfaces/Caretaker/ICaretakerAdvert";
import { Box, Divider, Grid, IconButton, makeStyles } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import isEmpty from "../../Utils/Empty";
import "./MyCaretakerAdvertisement.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import Comments from "./Comments";
import { GridBreak } from "./CaretakerAdvertismentLayout";

const MyCaretakerAdvertisement = ({ currentUser }: any) => {
  const [caretakerAdvert, setCaretakerAdvert] = useState<ICaretakerAdvert>();

  const navigate = useNavigate();

  async function getAdvert() {
    if (currentUser) {
      console.log(`getting`);
      const cAdvert =
        await caretakerAdvertisementApi.getUserCaretakerAdvertisement(
          currentUser.id
        );
      console.log(`cAdvert`);
      setCaretakerAdvert(cAdvert);
    }
  }

  const handleAdvertDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this advertisement?")) {
      await caretakerAdvertisementApi.deleteCaretakerAdvertisement(id);
      toast.success("Advertisement deleted successfully!");
      getAdvert();
    }
  };

  useEffect(() => {
    // if (isEmpty(currentUser)) {
    //   navigate("/Login");
    // }
    getAdvert();
  }, [currentUser]);

  console.log(`caretaker advert is ${caretakerAdvert}`);
  {
    caretakerAdvert
      ? console.log(`caretaker adveert is ${JSON.stringify(caretakerAdvert)}`)
      : console.log(`caretakre advert unde`);
  }
  return (
    <Box marginY={5}>
      {caretakerAdvert ? (
        <Box alignItems="center" justifyContent="center">
          <Typography align="center" color="inherit" sx={{ fontSize: 32 }}>
            My advertisement
          </Typography>
          <Box marginY={5}>
            <Box
              marginY={10}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Grid
                container
                direction="column"
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
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Grid
                      container
                      item
                      xs={12}
                      md={6}
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <img
                        className="cardImage"
                        src={
                          "http://localhost:3002/" + caretakerAdvert.photo_link
                        }
                        width="250"
                        height="250"
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                      xs={12}
                      md={6}
                    >
                      <Typography
                        color="inherit"
                        sx={{ fontSize: 24, fontWeight: 600 }}
                      >
                        {caretakerAdvert.name + " " + caretakerAdvert.surname}
                      </Typography>

                      <GridBreak />

                      <Typography sx={{ fontSize: 14 }}>
                        {caretakerAdvert.age +
                          " " +
                          " years old." +
                          " " +
                          caretakerAdvert.activity +
                          ". " +
                          caretakerAdvert.hour_price +
                          " eur per hour"}
                      </Typography>

                      <Box marginY={3}></Box>
                      <Typography color="inherit" sx={{ fontSize: 18 }}>
                        {caretakerAdvert.description}
                      </Typography>
                      {caretakerAdvert.extra_information ? (
                        <>
                          <Box marginY={3}></Box>
                          <Typography>
                            {caretakerAdvert.extra_information}
                          </Typography>
                        </>
                      ) : (
                        ""
                      )}
                    </Grid>
                  </Grid>
                </Box>
                <Box marginY={2}></Box>
                <Divider
                  style={{ color: "#793209" }}
                  sx={{ borderBottomWidth: 3 }}
                />
                <Box marginY={2}></Box>

                <Box sx={{ maxWidth: 1000 }}>
                  <Grid
                    item
                    xs={12}
                    container
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
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
                    {caretakerAdvert.services.map((service) => {
                      const labelText =
                        service === "house_sitting"
                          ? "house sitting"
                          : service === "medication_giving"
                          ? "medication giving"
                          : service;
                      return (
                        <>
                          <Box marginY={2}></Box>
                          <Grid item xs={6}></Grid>
                          <Grid item xs={6}>
                            <Typography>{labelText}</Typography>
                          </Grid>
                        </>
                      );
                    })}
                  </Grid>
                </Box>
                <Divider
                  style={{ color: "#793209" }}
                  sx={{ borderBottomWidth: 3 }}
                />
                <Box marginY={2}></Box>

                <Box sx={{ maxWidth: 1000 }}>
                  <Grid
                    item
                    xs={12}
                    container
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
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
                    {caretakerAdvert.pets.map((pet) => {
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
                <Divider
                  style={{ color: "#793209" }}
                  sx={{ borderBottomWidth: 3 }}
                />
                <Box marginY={2}></Box>
                <Box sx={{ maxWidth: 1000 }}>
                  <Grid
                    item
                    xs={12}
                    container
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
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
                  <Grid
                    item
                    xs={12}
                    container
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    {caretakerAdvert.languages.map((language) => {
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

                <Divider
                  style={{ color: "#793209" }}
                  sx={{ borderBottomWidth: 3 }}
                />
                <Box marginY={2}></Box>
                <Box sx={{ maxWidth: 1000 }}>
                  <Grid
                    item
                    xs={12}
                    container
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Grid item xs={6}>
                      <Typography
                        color="inherit"
                        sx={{ fontSize: 20, fontWeight: 600 }}
                      >
                        Personal information
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                        Email: {currentUser.email}
                        <GridBreak />
                        <Box marginY={2}></Box>
                        Experience with pets: {caretakerAdvert.experience}
                        <GridBreak />
                        <Box marginY={2}></Box>
                        Phone: {caretakerAdvert.phone}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box marginY={2}></Box>

                <Divider
                  style={{ color: "#793209" }}
                  sx={{ borderBottomWidth: 3 }}
                />
                <Box marginY={2}></Box>

                <Grid
                  container
                  item
                  xs={12}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Typography
                    color="inherit"
                    sx={{ fontSize: 25, fontWeight: 600 }}
                  >
                    Advertisement comments
                  </Typography>
                </Grid>
                <Box marginY={2}></Box>
                <Grid item xs={12}>
                  <Comments
                    currentUser={currentUser}
                    currentAdvertisement={caretakerAdvert}
                    isOwnerView={false}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box alignItems="center" justifyContent="center">
          <Typography align="center" color="inherit" sx={{ fontSize: 32 }}>
            You don't have an advertisement yet
          </Typography>
          <Box sx={{ minHeight: 300 }}></Box>
        </Box>
      )}
    </Box>
  );
};

export default MyCaretakerAdvertisement;
