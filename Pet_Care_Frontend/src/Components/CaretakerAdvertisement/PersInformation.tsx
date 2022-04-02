import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  firstName: string;
  registerFirstName: UseFormRegisterReturn;
  firstNameError: { message: string };
  lastName: string;
  address: string;
  phone: string;
  age: number;
  work_activities: string;
  experience: string;
  handlePersonalValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PersInformation({
  firstName,
  lastName,
  address,
  phone,
  age,
  work_activities,
  experience,
  registerFirstName,
  firstNameError,
  handlePersonalValues,
}: Props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal information
      </Typography>
      <Grid container spacing={3} maxWidth="md">
        <Grid item xs={12} sm={6}>
          <TextField
            {...registerFirstName}
            className={`form-control ${firstNameError ? "is-invalid" : ""}`}
            id="firstName"
            value={firstName}
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={handlePersonalValues}
          />
          <Typography color="red">{firstNameError?.message}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            value={lastName}
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={handlePersonalValues}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={address}
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="Address"
            variant="standard"
            onChange={handlePersonalValues}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={phone}
            id="phone"
            name="phone"
            label="Phone number"
            fullWidth
            autoComplete="phone number"
            variant="standard"
            onChange={handlePersonalValues}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={age}
            id="age"
            name="age"
            label="Age"
            fullWidth
            autoComplete="age"
            variant="standard"
            onChange={handlePersonalValues}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={work_activities}
            id="work_activities"
            name="work_activities"
            label="Work/activities"
            fullWidth
            autoComplete="work-activities"
            variant="standard"
            onChange={handlePersonalValues}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            value={experience}
            id="experience"
            name="experience"
            label="Experience"
            fullWidth
            variant="standard"
            onChange={handlePersonalValues}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
