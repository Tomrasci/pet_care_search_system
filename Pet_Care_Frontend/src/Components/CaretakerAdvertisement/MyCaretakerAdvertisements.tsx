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
import { Grid, IconButton, makeStyles } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import isEmpty from "../../Utils/Empty";
import "./MyCaretakerAdvertisement.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const MyCaretakerAdvertisements = ({ currentUser }: any) => {
  const [caretakerAdverts, setCaretakerAdverts] = useState<ICaretakerAdvert[]>(
    []
  );

  const navigate = useNavigate();

  if (isEmpty(currentUser)) {
    navigate("/Login");
  }

  async function getAdverts() {
    if (currentUser) {
      const cAdverts =
        await caretakerAdvertisementApi.getUserCaretakerAdvertisements(
          currentUser.id
        );
      setCaretakerAdverts(cAdverts);
    }
  }

  const handleAdvertDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this advertisement?")) {
      await caretakerAdvertisementApi.deleteCaretakerAdvertisement(id);
      toast.success("Advertisement deleted successfully!");
      getAdverts();
    }
  };

  useEffect(() => {
    getAdverts();
  }, [currentUser]);

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
                    <CardActions disableSpacing className="parentFlexRight">
                      <Button className="leftAlignItem" size="small">
                        More information
                      </Button>
                      <Link to={`/caretakerUpdate/${advert.id}`}>
                        <IconButton size="large">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton
                        onClick={() => handleAdvertDelete(advert.id)}
                        size="large"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
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
