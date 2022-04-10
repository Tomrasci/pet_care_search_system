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
import { Link, useNavigate } from "react-router-dom";
import isEmpty from "../../Utils/Empty";

const MyCaretakerAdvertisements = ({ currentUser }: any) => {
  const [caretakerAdverts, setCaretakerAdverts] = useState<ICaretakerAdvert[]>(
    []
  );

  const navigate = useNavigate();

  if (isEmpty(currentUser)) {
    navigate("/Login");
  }

  useEffect(() => {
    async function getAdverts() {
      const cAdverts =
        await caretakerAdvertisementApi.getUserCaretakerAdvertisements(
          currentUser.id
        );
      setCaretakerAdverts(cAdverts);
    }
    getAdverts();
  }, []);

  return (
    <Box marginY={5}>
      {caretakerAdverts ? (
        <Box alignItems="center" justifyContent="center">
          <Typography align="center" color="inherit" sx={{ fontSize: 32 }}>
            My advertisements
          </Typography>
          <Box marginY={5}> </Box>
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
                      <Button size="small">More information</Button>
                    </CardActions>
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ) : (
        <Box alignItems="center" justifyContent="center">
          <Typography align="center" color="inherit" sx={{ fontSize: 32 }}>
            No advertisements yet{" "}
          </Typography>
          <Box sx={{ minHeight: 300 }}></Box>
        </Box>
      )}
    </Box>
  );
};

export default MyCaretakerAdvertisements;
