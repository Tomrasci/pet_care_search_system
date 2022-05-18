import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Grid, IconButton } from "@mui/material";
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
    if (isEmpty(currentUser)) {
      navigate("/Login");
    }
    getAdvert();
  }, [currentUser]);

  return (
    <Box marginY={5}>
      {ownerAdvert ? (
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
                    {ownerAdvert.title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 13 }}
                    gutterBottom
                    component="div"
                  >
                    {ownerAdvert.name +
                      "." +
                      " " +
                      ownerAdvert.time_intervals +
                      " years old." +
                      " "}
                  </Typography>
                  <Typography sx={{ fontSize: 16 }}>
                    {ownerAdvert.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing className="parentFlexRight">
                  <Button className="leftAlignItem" size="small">
                    More information
                  </Button>
                  <Link to={`/OwnerAdvertEdit/${ownerAdvert.id}`}>
                    <IconButton size="large">
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    onClick={() => handleAdvertDelete(ownerAdvert.id)}
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

export default MyOwnerAdvertisement;
