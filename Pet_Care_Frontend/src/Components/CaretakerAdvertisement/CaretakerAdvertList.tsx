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
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

const CaretakerAdvertList = ({ currentUser }: any) => {
  const [caretakerAdverts, setCaretakerAdverts] = useState<ICaretakerAdvert[]>(
    []
  );

  useEffect(() => {
    async function getAdverts() {
      const cAdverts =
        await caretakerAdvertisementApi.getCaretakerAdvertisements();
      setCaretakerAdverts(cAdverts);
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

          <Grid
            container
            spacing={4}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            {caretakerAdverts.map((advert) => {
              const advertText = advert.description.substring(0, 80) + "...";
              return (
                <Grid item xs={12}>
                  <Card sx={{ minWidth: 600, maxWidth: 600 }}>
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
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
                      <Typography sx={{ fontSize: 16 }}>
                        {advertText}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link
                        to="/Login"
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <Button size="small">More information</Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
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

export default CaretakerAdvertList;
