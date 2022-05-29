import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Divider, Grid, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import caretakerAdvertisementApi from "../../Api/caretakerAdvertisementApi";
import userApi from "../../Api/userApi";
import { ICaretakerAdvert } from "../../Interfaces/Caretaker/ICaretakerAdvert";
import { GridBreak } from "./CaretakerAdvertismentLayout";
import Comments from "./Comments";
import "./MyCaretakerAdvertisement.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const MyCaretakerAdvertisement = ({ currentUser, loadUsers }: any) => {
  const [caretakerAdvert, setCaretakerAdvert] = useState<ICaretakerAdvert>();

  const navigate = useNavigate();

  async function getAdvert() {
    if (currentUser) {
      const cAdvert =
        await caretakerAdvertisementApi.getUserCaretakerAdvertisement(
          currentUser.id
        );
      setCaretakerAdvert(cAdvert);
    }
  }

  const handleAdvertDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this advertisement?")) {
      await caretakerAdvertisementApi.deleteCaretakerAdvertisement(id);
      userApi.removeUserAdvertisementCount();
      loadUsers();
      toast.success("Advertisement deleted successfully!");
      navigate("/");
    }
  };

  useEffect(() => {
    getAdvert();
  }, []);

  return (
    <Box marginY={5}>
      {caretakerAdvert ? (
        <Box alignItems="center" justifyContent="center">
          <Grid
            container
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item md={4} xs={12}></Grid>
            <Grid item md={4} xs={12}>
              <Typography
                align="center"
                color="#793209"
                fontWeight={500}
                sx={{ fontSize: 40 }}
              >
                My advertisement
              </Typography>
            </Grid>

            <Grid item md={2} xs={12}>
              <Link to={`/caretakerCalendar/${caretakerAdvert.id}`}>
                <IconButton>
                  <CalendarMonthIcon
                    color="primary"
                    sx={{ fontSize: "50px" }}
                  />
                </IconButton>
              </Link>
              <Link to={`/caretakerUpdate/${caretakerAdvert.id}`}>
                <IconButton>
                  <EditIcon color="secondary" sx={{ fontSize: "50px" }} />
                </IconButton>
              </Link>
              <IconButton
                onClick={() => handleAdvertDelete(caretakerAdvert.id)}
              >
                <DeleteIcon color="error" sx={{ fontSize: "50px" }} />
              </IconButton>
            </Grid>
            <Grid item md={2} xs={12}></Grid>
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
                        {caretakerAdvert.activity +
                          ". " +
                          caretakerAdvert.hour_price +
                          " eur per hour"}
                      </Typography>

                      <Box marginY={3}></Box>
                      <Grid
                        item
                        container
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                        }}
                        xs={12}
                      >
                        {" "}
                        <Typography color="inherit" sx={{ fontSize: 18 }}>
                          {caretakerAdvert.description}
                        </Typography>
                      </Grid>
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
                        service === "Owner_house_sitting"
                          ? "Owner house sitting"
                          : service === "Medication_giving"
                          ? "Medication giving"
                          : service === "Caretaker_house_sitting"
                          ? "Caretaker house sitting"
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
                        Other information
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
                        {caretakerAdvert.extra_information ? (
                          <>
                            <GridBreak />
                            <Box marginY={2}></Box>
                            <Grid item xs={12}>
                              Extra information:
                              {caretakerAdvert.extra_information}
                            </Grid>
                          </>
                        ) : (
                          ""
                        )}
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
                    color="#793209"
                    fontWeight={600}
                    sx={{ fontSize: 25 }}
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
