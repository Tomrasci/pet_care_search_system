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
import { CardMedia, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import "./CaretakerAdvertList.css";
import isEmpty from "../../Utils/Empty";

const CaretakerAdvertList = ({ currentUser }: any) => {
  const [caretakerAdverts, setCaretakerAdverts] = useState<ICaretakerAdvert[]>(
    []
  );

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
    <Box marginY={5}>
      {caretakerAdverts ? (
        <Box alignItems="center" justifyContent="center">
          <Typography align="center" color="inherit" sx={{ fontSize: 32 }}>
            Caretaker advertisements
          </Typography>
          <Box sx={{ mt: 5 }}></Box>
          <Grid container>
            <Grid item md={2} xs={12}></Grid>
            <Grid item md={7} xs={12}>
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

            <Grid item md={3} xs={12}>
              <div style={{ height: "100vh", width: "100%" }}></div>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <div>Loading</div>
      )}
    </Box>
  );
};

export default CaretakerAdvertList;
