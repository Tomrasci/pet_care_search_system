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
import { CardMedia, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import "../CaretakerAdvertisement/CaretakerAdvertList.css";
import { IOwnerAdvert } from "../../Interfaces/Owner/IOwnerAdvert";
import ownerAdverisementApi from "../../Api/ownerAdverisementApi";

const OwnerAdvertList = ({ currentUser }: any) => {
  const [ownerAdverts, setOwnerAdverts] = useState<IOwnerAdvert[]>([]);

  useEffect(() => {
    async function getAdverts() {
      const oAdverts = await ownerAdverisementApi.getOwnerAdvertisements();
      setOwnerAdverts(oAdverts);
    }
    getAdverts();
  }, []);

  return (
    <Box marginY={5}>
      {ownerAdverts ? (
        <Box alignItems="center" justifyContent="center">
          <Typography align="center" color="inherit" sx={{ fontSize: 32 }}>
            Owner advertisements
          </Typography>
          <Box sx={{ mt: 5 }}></Box>
          <Grid
            container
            direction="column"
            alignItems="center"
            spacing={4}
            justifyContent="center"
            alignContent="center"
            display="flex"
          >
            {ownerAdverts.map((advert) => {
              return (
                <>
                  <Grid item xs={12} spacing={4}>
                    <Card sx={{ minWidth: 700, maxWidth: 700 }}>
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
                            sx={{
                              width: 150,
                              height: 100,
                              marginLeft: 2,
                            }}
                            image={"http://localhost:3002/" + advert.photo_link}
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
                                  advert.time_intervals +
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
                              {currentUser ? (
                                <Link
                                  to={`/OwnerAdvertisement/${advert.id}`}
                                  style={{
                                    textDecoration: "none",
                                  }}
                                >
                                  <Button size="small">More information</Button>
                                </Link>
                              ) : (
                                <Link
                                  to="/Login"
                                  style={{
                                    textDecoration: "none",
                                  }}
                                >
                                  <Button size="small">More information</Button>
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
        </Box>
      ) : (
        <div>Loading</div>
      )}
    </Box>
  );
};

export default OwnerAdvertList;
