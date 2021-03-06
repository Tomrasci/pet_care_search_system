import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import caretakerAdvertisementApi from "../../Api/caretakerAdvertisementApi";
import { ICaretakerAdvert } from "../../Interfaces/Caretaker/ICaretakerAdvert";
import { CardMedia, createTheme, Grid, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";
import "../CaretakerAdvertisement/CaretakerAdvertList.css";
import { IOwnerAdvert } from "../../Interfaces/Owner/IOwnerAdvert";
import ownerAdverisementApi from "../../Api/ownerAdverisementApi";
import isEmpty from "../../Utils/Empty";
import FilterPanel from "../CaretakerAdvertisement/FilterPanel";
import Pagination from "../../Utils/Pagination";

const OwnerAdvertList = ({ currentUser }: any) => {
  const [ownerAdverts, setOwnerAdverts] = useState<IOwnerAdvert[]>([]);

  const [filteredAdverts, setFilteredAdverts] = useState<IOwnerAdvert[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [advertisementsPerPage, setAdvertsimentsPerPage] = useState(5);

  const indexOfLastAdvertisement = currentPage * advertisementsPerPage;
  const indexOfFirstAdvertisement =
    indexOfLastAdvertisement - advertisementsPerPage;
  const currentAdvertisements = filteredAdverts.slice(
    indexOfFirstAdvertisement,
    indexOfLastAdvertisement
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [selectedPrice, setSelectedPrice] = useState([1, 100]);
  const [services, setServices] = useState([
    { id: 1, checked: false, label: "Walking" },
    { id: 2, checked: false, label: "Owner_house_sitting" },
    { id: 3, checked: false, label: "Caretaker_house_sitting" },
    { id: 4, checked: false, label: "Boarding" },
    { id: 5, checked: false, label: "Medication_giving" },
    { id: 6, checked: false, label: "Nursing" },
  ]);
  const [pets, setPets] = useState([
    { id: 1, checked: false, label: "Cat" },
    { id: 2, checked: false, label: "Dog" },
    { id: 3, checked: false, label: "Bird" },
    { id: 4, checked: false, label: "Fish" },
    { id: 5, checked: false, label: "Turtle" },
    { id: 6, checked: false, label: "Other" },
  ]);

  const [languages, setLanguages] = useState([
    { id: 1, checked: false, label: "Lithuanian" },
    { id: 2, checked: false, label: "English" },
    { id: 3, checked: false, label: "German" },
    { id: 4, checked: false, label: "French" },
    { id: 5, checked: false, label: "Russian" },
    { id: 6, checked: false, label: "Spanish" },
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
    setPets(changeCheckedPets);
  };

  const handleChangeCheckedLanguages = (id: number) => {
    const languagesList = languages;
    const changeCheckedLanguages = languagesList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setLanguages(changeCheckedLanguages);
  };

  const handleChangePrice = (event: any, value: number[]) => {
    setSelectedPrice(value);
  };
  const applyFilters = () => {
    let updatedAdverts = ownerAdverts;
    const servicesChecked = services
      .filter((item) => item.checked)
      .map((item) => item.label);

    if (servicesChecked.length) {
      updatedAdverts = updatedAdverts.filter((advert) => {
        return advert.services.some((s) => servicesChecked.includes(s));
      });
    }
    const petsChecked = pets
      .filter((item) => item.checked)
      .map((item) => item.label);

    if (petsChecked.length) {
      updatedAdverts = updatedAdverts.filter((advert) => {
        return advert.pets.some((p) => petsChecked.includes(p));
      });
    }
    const languagesChecked = languages
      .filter((item) => item.checked)
      .map((item) => item.label);

    if (languagesChecked.length) {
      updatedAdverts = updatedAdverts.filter((advert) => {
        return advert.languages.some((l) => languagesChecked.includes(l));
      });
    }
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];

    updatedAdverts = updatedAdverts.filter((item) => {
      return item.hour_price >= minPrice && item.hour_price <= maxPrice;
    });

    setFilteredAdverts(updatedAdverts);
  };
  useEffect(() => {
    applyFilters();
  }, [services, pets, selectedPrice, languages]);

  useEffect(() => {
    async function getAdverts() {
      await ownerAdverisementApi.getOwnerAdvertisements().then((oAdverts) => {
        setOwnerAdverts(oAdverts);
        setFilteredAdverts(oAdverts);
      });
    }
    getAdverts();
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#793209",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box marginY={5}>
        {ownerAdverts ? (
          <Box alignItems="center" justifyContent="center">
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="#793209"
              fontSize={32}
              fontWeight={500}
            >
              Owner advertisements
            </Typography>
            <Box sx={{ mt: 5 }}></Box>
            <Grid container>
              <Grid item md={2} xs={12}>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  alignContent="center"
                >
                  <Grid item xs={12}>
                    <Typography
                      component="h1"
                      variant="h4"
                      color="#793209"
                      fontSize={32}
                      fontWeight={500}
                    >
                      Filters
                    </Typography>
                  </Grid>
                  <Box marginY={2}></Box>
                  <Grid item xs={12}>
                    <FilterPanel
                      services={services}
                      changeCheckedServices={handleChangeCheckedServices}
                      pets={pets}
                      changeCheckedPets={handleChangeCheckedPets}
                      selectedPrice={selectedPrice}
                      changePrice={handleChangePrice}
                      languages={languages}
                      changeCheckedLanguages={handleChangeCheckedLanguages}
                    ></FilterPanel>
                  </Grid>
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
                  {currentAdvertisements.map((advert) => {
                    return (
                      <>
                        <Grid item xs={12} spacing={4}>
                          <Card
                            elevation={10}
                            sx={{
                              width: {
                                sx: 1.0,
                                md: 700,
                                sm: 550,
                                xs: 350,
                              },
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
                                  component="img"
                                  className="cardImage"
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
                                      {advert.city +
                                        "." +
                                        " " +
                                        advert.hour_price +
                                        " " +
                                        "eur per hour."}
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
                                        to={`/OwnerAdvertisement/${advert.id}`}
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
                <Box marginY={5}></Box>
                <Grid
                  item
                  container
                  alignItems="center"
                  justifyContent="center"
                  display="flex"
                  xs={12}
                >
                  <Pagination
                    advertisementsPerPage={advertisementsPerPage}
                    totalAdvertisements={filteredAdverts.length}
                    paginate={paginate}
                  ></Pagination>
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

export default OwnerAdvertList;
