import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useEffect } from "react";
import { ILanguageType } from "../../Interfaces/Caretaker/ILanguageType";
import {
  Controller,
  useFormContext,
  UseFormRegisterReturn,
} from "react-hook-form";
import isEmpty from "../../Utils/Empty";
import "../CaretakerAdvertisement/PersInformation.css";

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

export default function OwnerPersInformation({
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
        <Typography variant="h6" gutterBottom>
          Personal information
        </Typography>
        <Grid container spacing={3} maxWidth="md">
          <Grid item xs={12} sm={6}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
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

          <Grid item xs={12} sx={{ mt: 3 }}>
            <Typography>Choose your photo</Typography>
          </Grid>
          <Grid item xs={12}>
            <input type="file" onChange={onSelectFile} className="fileInput" />
            {(selectedFile || isEdit) && (
              <img src={preview} width="150" height="100" />
            )}
          </Grid>

          <Grid item xs={12} sx={{ mt: 3 }}>
            <Typography>Languages</Typography>
          </Grid>
          {languages.map((language: ILanguageType, index: number) => {
            return (
              <Grid item xs={2}>
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
