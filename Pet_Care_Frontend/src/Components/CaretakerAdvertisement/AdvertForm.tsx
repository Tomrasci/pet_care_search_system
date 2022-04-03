import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function AdvertForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Advertisement details
      </Typography>
      <Grid container spacing={7} maxWidth="md">
        <Grid item xs={12}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="title"
                name="title"
                label="Title"
                fullWidth
                autoComplete="title"
                variant="outlined"
                error={!!errors.title}
                helperText={errors.title ? errors.title?.message : ""}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="description"
                name="description"
                label="Description"
                fullWidth
                multiline
                rows="6"
                autoComplete="description"
                variant="outlined"
                error={!!errors.description}
                helperText={
                  errors.description ? errors.description?.message : ""
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="extra_information"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="extra_information"
                name="extra_information"
                label="Extra information"
                fullWidth
                multiline
                rows="2"
                autoComplete="extra_info"
                variant="outlined"
                error={!!errors.extra_information}
                helperText={
                  errors.extra_information
                    ? errors.title?.extra_information
                    : ""
                }
              />
            )}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
