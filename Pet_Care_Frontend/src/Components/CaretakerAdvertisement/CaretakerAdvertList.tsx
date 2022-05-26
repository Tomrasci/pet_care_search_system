import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect, useRef } from "react";
import caretakerAdvertisementApi from "../../Api/caretakerAdvertisementApi";
import { ICaretakerAdvert } from "../../Interfaces/Caretaker/ICaretakerAdvert";
import { CardMedia, createTheme, Grid, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";
import "./CaretakerAdvertList.css";
import isEmpty from "../../Utils/Empty";

const CaretakerAdvertList = ({ currentUser }: any) => {
  const [caretakerAdverts, setCaretakerAdverts] = useState<ICaretakerAdvert[]>(
    []
  );
  const [services, setServices] = useState([
    { id: 1, checked: false, label: "Walking" },
    { id: 2, checked: false, label: "House sitting" },
    { id: 3, checked: false, label: "Nursing" },
    { id: 4, checked: false, label: "Boarding" },
    { id: 5, checked: false, label: "Medication giving" },
    { id: 6, checked: false, label: "Grooming" },
  ]);
  const [pets, setPets] = useState([
    { id: 1, checked: false, label: "Cat" },
    { id: 2, checked: false, label: "Dog" },
    { id: 3, checked: false, label: "Bird" },
    { id: 4, checked: false, label: "Fish" },
    { id: 5, checked: false, label: "Turtle" },
    { id: 6, checked: false, label: "Other" },
  ]);

  const handleChangeCheckedServices = (id: number) => {
    const servicesList = services;
    const changeCheckedServices = servicesList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setServices(changeCheckedServices);
  };
  const handleChangeCheckedPets = (id: number) => {
    const petsList = pets;
    const changeCheckedPets = petsList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setServices(changeCheckedPets);
  };

  // const changeServiceLabel=(advert : ICaretakerAdvert) => {
  //  return  advert.service === "house_sitting" ? "house sitting" : service === "medication_giving"
  //   ?  "medication giving" :  service
  // }

  const applyFilters = () => {
    let updatedAdverts = caretakerAdverts;
    const servicesChecked = services
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (servicesChecked.length) {
      let updatedAdvertList: ICaretakerAdvert[] = updatedAdverts.map(
        (advert) => {
          return {
            ...advert,
            services: advert.services.map((service) => {
              return service === "house_sitting"
                ? "house sitting"
                : service === "medication_giving"
                ? "medication giving"
                : service;
            }),
          };
        }
      );
      // updatedAdvertList = updatedAdvertList.filter((item) =>
      //   item.services.every(service => services.includes())
      // );
    }
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "#793209",
      },
    },
  });

  useEffect(() => {
    async function getAdverts() {
      await caretakerAdvertisementApi
        .getCaretakerAdvertisements()
        .then((adverts) => {
          setCaretakerAdverts(adverts);
        });
    }
    getAdverts();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box marginY={5}>
        {caretakerAdverts ? (
          <Box alignItems="center" justifyContent="center">
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="#793209"
              fontSize={32}
              fontWeight={500}
            >
              Caretaker advertisements
            </Typography>
            <Box sx={{ mt: 5 }}></Box>
            <Grid container>
              <Grid item md={2} xs={12}>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  spacing={4}
                  justifyContent="center"
                  alignContent="center"
                  display="flex"
                >
                  <Typography
                    component="h1"
                    variant="h4"
                    align="center"
                    color="#793209"
                    fontSize={25}
                    fontWeight={500}
                  >
                    Filters
                  </Typography>
                </Grid>
              </Grid>
              <Grid item md={8} xs={12}>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  spacing={4}
                  justifyContent="center"
                  alignContent="center"
                  display="flex"
                >
                  {caretakerAdverts.map((advert) => {
                    return (
                      <>
                        <Grid item xs={12} spacing={4}>
                          <Card
                            sx={{
                              width: {
                                sx: 1.0,
                                md: 700,
                                sm: 550,
                                xs: 350,
                              },
                              border: "2px solid brown",
                            }}
                          >
                            <Grid
                              container
                              spacing={6}
                              style={{
                                justifyContent: "center",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Grid item>
                                <CardMedia
                                  className="cardImage"
                                  component="img"
                                  sx={{
                                    width: 100,
                                    height: 100,
                                    marginLeft: 2,
                                  }}
                                  image={
                                    "http://localhost:3002/" + advert.photo_link
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} sm container>
                                <Grid item xs spacing={4}>
                                  <CardContent>
                                    <Typography
                                      variant="h5"
                                      gutterBottom
                                      className="lineBreakTitle"
                                    >
                                      {advert.title}
                                    </Typography>
                                    <Typography
                                      sx={{ fontSize: 13 }}
                                      gutterBottom
                                      component="div"
                                    >
                                      {advert.name +
                                        "." +
                                        " " +
                                        advert.age +
                                        " years old." +
                                        " " +
                                        advert.experience +
                                        "."}
                                    </Typography>
                                    <Typography
                                      sx={{ fontSize: 16 }}
                                      className="lineBreak"
                                    >
                                      {advert.description}
                                    </Typography>
                                  </CardContent>
                                  <CardActions>
                                    {currentUser && !isEmpty(currentUser) ? (
                                      <Link
                                        to={`/CaretakerAdvertisement/${advert.id}`}
                                        style={{
                                          textDecoration: "none",
                                        }}
                                      >
                                        <Button size="small">
                                          More information
                                        </Button>
                                      </Link>
                                    ) : (
                                      <Link
                                        to="/Login"
                                        style={{
                                          textDecoration: "none",
                                        }}
                                      >
                                        <Button size="small">
                                          More information
                                        </Button>
                                      </Link>
                                    )}
                                  </CardActions>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Card>
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              </Grid>

              <Grid item md={2} xs={12}>
                <div style={{ height: "100vh", width: "100%" }}></div>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <div>Loading</div>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default CaretakerAdvertList;
