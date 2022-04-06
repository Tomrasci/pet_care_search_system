import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TimePicker from "@mui/lab/TimePicker";
import { useFormContext, UseFormRegisterReturn } from "react-hook-form";
import { DateRangePicker } from "@mui/lab";
import { Box } from "@mui/material";
import { DateRange } from "@mui/lab/DateRangePicker/RangeTypes";
import { Controller } from "react-hook-form";
import { lt } from "date-fns/locale";
import { useState, useEffect } from "react";
import serviceTypeApi from "../../Api/serviceTypeApi";
import petTypeApi from "../../Api/petTypeApi";
import { IServiceType } from "../../Interfaces/Caretaker/IServiceType";
import { IPetType } from "../../Interfaces/IPetType";

export default function PriceandDates() {
  const [petTypes, setPetTypes] = React.useState<IPetType[]>([]);
  const [serviceTypes, setServiceTypes] = useState<IServiceType[]>([]);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    async function getTypes() {
      const petTypesGet = await petTypeApi.getPetTypes();
      setPetTypes(petTypesGet);
      const serviceTypesGet = await serviceTypeApi.getServiceTypes();
      setServiceTypes(serviceTypesGet);
    }
    getTypes();
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Schedule and price
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={lt}>
        <Grid container spacing={3} maxWidth="sm">
          <Grid item xs={12} md={6}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  mask="____-__-__"
                  label="Start date"
                  onChange={(e) => field.onChange(e)}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      error={!!errors.startDate}
                      helperText={
                        errors.startDate
                          ? "Start date is required and must be valid"
                          : ""
                      }
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  mask="____-__-__"
                  label="End date"
                  onChange={(e) => field.onChange(e)}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      error={!!errors.endDate}
                      helperText={
                        errors.endDate
                          ? "End date is required and must be valid"
                          : ""
                      }
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="startTime"
              control={control}
              render={({ field }) => (
                <TimePicker
                  {...field}
                  label="Start time"
                  onChange={(e) => field.onChange(e)}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      error={!!errors.startTime}
                      helperText={
                        errors.startTime ? errors.startTime?.message : ""
                      }
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="endTime"
              control={control}
              render={({ field }) => (
                <TimePicker
                  {...field}
                  label="End time"
                  onChange={(e) => field.onChange(e)}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      error={!!errors.endTime}
                      helperText={errors.endTime ? errors.endTime?.message : ""}
                    />
                  )}
                />
              )}
            />
            {/* "End time is required and must be valid" */}
          </Grid>
          <Grid item xs={6} md={3}>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="price"
                  name="price"
                  label="Price"
                  type="number"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  error={!!errors.price}
                  helperText={
                    errors.price ? "Price is required and must be a number" : ""
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <p>Eur</p>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </LocalizationProvider>
    </React.Fragment>
  );
}
