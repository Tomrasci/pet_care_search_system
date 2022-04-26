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

const MyCaretakerAdvertisement = ({ currentUser }: any) => {
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
      toast.success("Advertisement deleted successfully!");
      getAdvert();
    }
  };

  useEffect(() => {
    if (isEmpty(currentUser)) {
      navigate("/Login");
    }
    getAdvert();
  }, [currentUser]);

  return (
    <Box marginY={5}>
      {caretakerAdvert ? (
        <Box alignItems="center" justifyContent="center">
          <Typography align="center" color="inherit" sx={{ fontSize: 32 }}>
            My advertisement
          </Typography>
          <Box marginY={5}> </Box>
          <Grid
            container
            spacing={4}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            {" "}
            <Grid item xs={12}>
              <Card sx={{ minWidth: 600, maxWidth: 600 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {caretakerAdvert.title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 13 }}
                    gutterBottom
                    component="div"
                  >
                    {caretakerAdvert.name +
                      "." +
                      " " +
                      caretakerAdvert.age +
                      " years old." +
                      " " +
                      caretakerAdvert.experience +
                      "."}
                  </Typography>
                  <Typography sx={{ fontSize: 16 }}>
                    {caretakerAdvert.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing className="parentFlexRight">
                  <Button className="leftAlignItem" size="small">
                    More information
                  </Button>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/caretakerCalendar/${caretakerAdvert.id}`}
                  >
                    <Button className="leftAlignItem" size="small">
                      My calendar
                    </Button>
                  </Link>
                  <Link to={`/caretakerUpdate/${caretakerAdvert.id}`}>
                    <IconButton size="large">
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    onClick={() => handleAdvertDelete(caretakerAdvert.id)}
                    size="large"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
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
