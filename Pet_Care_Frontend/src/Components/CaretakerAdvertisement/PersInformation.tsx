import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useEffect } from "react";
import {
  Controller,
  useFormContext,
  UseFormRegisterReturn,
} from "react-hook-form";

interface Props {
  sendError: (e: boolean) => void;
  clicked: boolean;
  setSelected: any;
  languages: any;
  checkedState: {
    value: string;
    checked: boolean;
  }[];
  setCheckedState: any;
}

export default function PersInformation({
  sendError,
  clicked,
  setSelected,
  languages,
  checkedState,
  setCheckedState,
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  let error = false;

  function handleCheckbox(position: number) {
    const updatedCheckedState = checkedState.map((item: any, index: number) =>
      index === position
        ? { value: item.value, checked: !item.checked }
        : { value: item.value, checked: item.checked }
    );

    setCheckedState(updatedCheckedState);
  }
  useEffect(() => {
    const selectedLanguages = checkedState.filter(
      (language) => language.checked === true
    );
    // console.log(`selected languages are ${JSON.stringify(selectedLanguages)}`);
    setSelected(selectedLanguages);

    error = checkedState.filter((x) => x.checked === true).length < 1;
    if (error) {
      sendError(true);
    } else {
      sendError(false);
    }
  }, [checkedState]);

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
        <Grid item xs={12} sx={{ mt: 3 }}>
          <Typography>Languages</Typography>
        </Grid>
        {languages.map((language: any, index: number) => {
          return (
            <Grid item xs={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => handleCheckbox(index)}
                    name={language}
                    key={index}
                    id={language}
                    value={language}
                    checked={checkedState[index].checked}
                  />
                }
                key={index}
                label={language}
              />
            </Grid>
          );
        })}
        {clicked && error && (
          <Grid item xs={12}>
            <Typography color="red">
              Atleast one language must be selected
            </Typography>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}
