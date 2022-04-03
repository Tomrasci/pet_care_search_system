import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PersInformation from "./PersInformation";
import PriceandDates from "./PriceandDates";
import AdvertForm from "./AdvertForm";
import { useFormHook } from "../../Utils/useFormHook";
import { ICaretakerAdvertCreate } from "../../Interfaces/Caretaker/ICaretakerAdvertCreate";
import caretakerAdvertisementApi from "../../Api/caretakerAdvertisementApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const theme = createTheme();
const steps = [
  "Personal information",
  "Schedule and price",
  "Advertisement details",
];
const DateReactSimple = () => {
  const [startDate, setStartDate] = React.useState(new Date());

  const { register, control, handleSubmit, trigger, formState } = useForm();
  const { errors } = formState;
  const [activeStep, setActiveStep] = React.useState(0);

  //   const required = {
  //     value: true,
  //     message: "This field is required",
  //   };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <div>
            <DatePicker
              required
              //   {...register("startDate", { required: "Date is required" })}
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
            />
            <Typography color="red">{errors.startDate?.message}</Typography>
          </div>
        );

      case 1:
        return <div>One</div>;

      case 2:
        return <div>Two</div>;
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = async () => {
    let isValid = false;

    switch (activeStep) {
      case 0:
        console.log(`Checking date is valid, date is ${startDate}`);
        isValid = await trigger(["startDate"], { shouldFocus: true });
        console.log(isValid);
        if (isValid) {
          setActiveStep(activeStep + 1);
        }

        break;
      case 1:
        setActiveStep(activeStep + 1);
        break;

      case 2:
        setActiveStep(activeStep + 1);
        break;
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const postDate = () => {
    console.log(`Date is submited, date is ${startDate}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <form onSubmit={handleSubmit(postDate)}>
        <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Advertisement creation
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 6, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <div>
                  <Button type="submit">Submit</Button>
                </div>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? "Create" : "Next"}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </Container>
      </form>
    </ThemeProvider>
  );
};

export default DateReactSimple;
