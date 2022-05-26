import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Divider, Grid, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ownerAdverisementApi from "../../Api/ownerAdverisementApi";
import { IOwnerAdvert } from "../../Interfaces/Owner/IOwnerAdvert";
import isEmpty from "../../Utils/Empty";
import "../CaretakerAdvertisement/MyCaretakerAdvertisement.css";
import { GridBreak } from "./OwnerAdvertisementLayout";

const MyOwnerAdvertisement = ({ currentUser }: any) => {
  const [ownerAdvert, setOwnerAdvert] = useState<IOwnerAdvert>();

  const navigate = useNavigate();

  async function getAdvert() {
    if (currentUser) {
      const oAdvert = await ownerAdverisementApi.getUserOwnerAdvertisement(
        currentUser.id
      );
      setOwnerAdvert(oAdvert);
    }
  }

  const handleAdvertDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this advertisement?")) {
      await ownerAdverisementApi.deleteOwnerAdvertisement(id);
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

  return (
    <Box marginY={5}>
      {ownerAdvert ? (
        <Box alignItems="center" justifyContent="center">
          <Grid
            container
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Typography
                align="center"
                color="#793209"
                fontWeight={500}
                sx={{ fontSize: 40 }}
              >
                My advertisement
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Link to={`/OwnerAdvertEdit/${ownerAdvert.id}`}>
                <IconButton>
                  <EditIcon color="secondary" sx={{ fontSize: "50px" }} />
                </IconButton>
              </Link>
              <IconButton onClick={() => handleAdvertDelete(ownerAdvert.id)}>
                <DeleteIcon color="error" sx={{ fontSize: "50px" }} />
              </IconButton>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
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
                        src={"http://localhost:3002/" + ownerAdvert.photo_link}
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
                        {ownerAdvert.name + " " + ownerAdvert.surname}
                      </Typography>

                      <GridBreak />

                      <Typography sx={{ fontSize: 14 }}>
                        {ownerAdvert.hour_price + " eur per hour"}
                      </Typography>

                      <Box marginY={3}></Box>
                      <Typography color="inherit" sx={{ fontSize: 18 }}>
                        {ownerAdvert.description}
                      </Typography>
                      {ownerAdvert.extra_information ? (
                        <>
                          <Box marginY={3}></Box>
                          <Typography>
                            {ownerAdvert.extra_information}
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
                        Looking for services
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
                    {ownerAdvert.services.map((service) => {
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
                        Need to take care of pets
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
                    {ownerAdvert.pets.map((pet) => {
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
                        Looking for a person speaking language(s)
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
                    {ownerAdvert.languages.map((language) => {
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
                        <GridBreak />
                        <Box marginY={2}></Box>
                        Phone: {ownerAdvert.phone}
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
                  <Grid item xs={6}>
                    <Typography
                      color="inherit"
                      sx={{ fontSize: 20, fontWeight: 600 }}
                    >
                      Required for date(s) and time(s)
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {ownerAdvert.endDate ? (
                      <Typography>
                        Date:
                        {" " +
                          new Date(ownerAdvert.startDate).toDateString() +
                          " " +
                          " - " +
                          new Date(ownerAdvert.endDate).toDateString()}
                      </Typography>
                    ) : (
                      <Typography>
                        Date:
                        {" " + new Date(ownerAdvert.startDate).toDateString()}
                      </Typography>
                    )}
                    <GridBreak />
                    Time(s):
                    {ownerAdvert.time_intervals.map((time) => {
                      return <Typography>{time}</Typography>;
                    })}
                  </Grid>
                </Grid>
                <Box marginY={2}></Box>
                <Divider
                  style={{ color: "#793209" }}
                  sx={{ borderBottomWidth: 3 }}
                />
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

export default MyOwnerAdvertisement;
