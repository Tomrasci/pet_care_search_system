import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  Controller,
  useFormContext,
  UseFormRegisterReturn,
} from "react-hook-form";

interface Props {
  sendError: (e: boolean) => void;
}

const languages = [
  { id: 1, value: "Lithuanian" },
  { id: 2, value: "English" },
  { id: 3, value: "French" },
  { id: 4, value: "German" },
  { id: 5, value: "Russian" },
  { id: 6, value: "Spanish" },
];

export default function PersInformation({ sendError }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [state, setState] = React.useState({
    Lithuanian: false,
    English: false,
    French: false,
    German: false,
    Russian: false,
    Spanish: false,
  });

  function handleCheckbox(event: React.ChangeEvent<HTMLInputElement>) {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  }

  const { Lithuanian, English, French, German, Russian, Spanish } = state;
  const error =
    [Lithuanian, English, French, German, Russian, Spanish].filter((v) => v)
      .length < 1;
  if (error) {
    sendError(true);
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal information
      </Typography>
      <Grid container spacing={3} maxWidth="md">
        <Grid item xs={12} sm={6}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                error={!!errors.firstName}
                helperText={errors.firstName ? errors.firstName?.message : ""}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                error={!!errors.lastName}
                helperText={errors.lastName ? errors.lastName?.message : ""}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                id="address"
                name="address"
                label="Address"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                error={!!errors.address}
                helperText={errors.address ? errors.address?.message : ""}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                id="phone"
                name="phone"
                label="Phone"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone?.message : ""}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                id="age"
                name="age"
                label="Age"
                type="number"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                error={!!errors.age}
                helperText={
                  errors.age ? "Age is required and must be a number" : ""
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="work_activities"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                id="work_activities"
                name="work_activities"
                label="Work/Activities"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                error={!!errors.work_activities}
                helperText={
                  errors.work_activities ? errors.work_activities?.message : ""
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="experience"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                id="experience"
                name="experience"
                label="Experience"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                error={!!errors.experience}
                helperText={errors.experience ? errors.experience?.message : ""}
              />
            )}
          />
        </Grid>
        {languages.map((language, index) => {
          return (
            <Grid item xs={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleCheckbox}
                    name="languages"
                    key={language.id}
                    id={language.value}
                    value={language.value}
                  />
                }
                label={language.value}
              />
            </Grid>
          );
        })}
        {error && (
          <Typography color="red">
            Atleast one language must be selected
          </Typography>
        )}
      </Grid>
    </React.Fragment>
  );
}
