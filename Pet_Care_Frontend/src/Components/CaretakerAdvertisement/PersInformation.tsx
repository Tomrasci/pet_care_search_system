import { Box, Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ILanguageType } from "../../Interfaces/Caretaker/ILanguageType";
import isEmpty from "../../Utils/Empty";
import "./PersInformation.css";

interface Props {
  sendError: (e: boolean) => void;
  clicked: boolean;
  setSelected: any;
  languages: any;
  checkedState: {
    value: ILanguageType;
    checked: boolean;
  }[];
  setCheckedState: any;
  selectedFile: File | null | undefined;
  onSelectFile: (e: any) => void;
  preview: string | undefined;
  isEdit: boolean;
}

export default function PersInformation({
  sendError,
  clicked,
  setSelected,
  languages,
  checkedState,
  setCheckedState,
  selectedFile,
  onSelectFile,
  preview,
  isEdit,
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  let error = true;

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
    setSelected(selectedLanguages);

    error = checkedState.filter((x) => x.checked === true).length < 1;
    if (error) {
      sendError(true);
    } else {
      sendError(false);
    }
  }, [checkedState]);

  return (
    languages &&
    checkedState &&
    !isEmpty(checkedState) && (
      <React.Fragment>
        <Typography variant="h6" color="#793209" gutterBottom>
          Personal information
        </Typography>
        <Box marginY={2}></Box>

        <Grid container spacing={3} maxWidth="md">
          <Grid item xs={12} sm={6}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  required
                  {...field}
                  id="name"
                  name="name"
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  error={!!errors.name}
                  helperText={errors.name ? errors.name?.message : ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="surname"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  id="surname"
                  name="surname"
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  error={!!errors.surname}
                  helperText={errors.surname ? errors.surname?.message : ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  error={!!errors.city}
                  helperText={errors.city ? errors.city?.message : ""}
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
              name="activity"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  id="activity"
                  name="activity"
                  label="Work/Activities"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  error={!!errors.activity}
                  helperText={errors.activity ? errors.activity?.message : ""}
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
                  label="Your experience with pets (ex. 5 years cat owner)"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  error={!!errors.experience}
                  helperText={
                    errors.experience ? errors.experience?.message : ""
                  }
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" component="label">
              Choose photo
              <input
                type="file"
                hidden
                onChange={onSelectFile}
                className="fileInput"
              />
            </Button>
            <Box marginX={1} marginY={1}></Box>

            {(selectedFile || isEdit) && (
              <img src={preview} width="250" height="150" />
            )}
          </Grid>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Typography color="#793209" fontWeight={500}>
              Languages *
            </Typography>
          </Grid>
          {languages.map((language: ILanguageType, index: number) => {
            return (
              <Grid item sm={2} xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => handleCheckbox(index)}
                      name={language.name}
                      key={language.id}
                      id={language.name}
                      value={language.name}
                      checked={checkedState[index].checked}
                    />
                  }
                  key={language.id}
                  label={language.name}
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
    )
  );
}
