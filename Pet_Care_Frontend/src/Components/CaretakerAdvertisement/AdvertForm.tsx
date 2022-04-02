import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";

interface Props {
  title: string;
  description: string;
  extra_information: string;
  handleAdvertValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AdvertForm({
  title,
  description,
  extra_information,
  handleAdvertValues,
}: Props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Advertisement details
      </Typography>
      <Grid container spacing={7} maxWidth="md">
        <Grid item xs={12}>
          <TextField
            required
            id="title"
            name="title"
            value={title}
            onChange={handleAdvertValues}
            label="Title"
            fullWidth
            autoComplete="title"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            name="description"
            value={description}
            onChange={handleAdvertValues}
            label="Description"
            fullWidth
            multiline
            rows="6"
            autoComplete="description"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="extraInfo"
            name="extraInformation"
            value={extra_information}
            onChange={handleAdvertValues}
            label="Extra information"
            fullWidth
            multiline
            rows="2"
            autoComplete="extraInformation"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
