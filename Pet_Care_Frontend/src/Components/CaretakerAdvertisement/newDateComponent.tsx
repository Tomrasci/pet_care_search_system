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
import { Controller, FormProvider, useForm } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Step1 from "./tests/Step1";
import Step2 from "./tests/Step2";

const theme = createTheme();
const steps = [
  "Personal information",
  "Schedule and price",
  "Advertisement details",
];

const NewDateComponent = () => {
  // const { register, control, handleSubmit, trigger, formState } = useForm();
  // const { errors } = formState;
  const [activeStep, setActiveStep] = React.useState(0);
  const [startDate, setStartDate] = React.useState<Date | null>(null);

  const required = {
    value: true,
    message: "This field is required",
  };

  const defaultValues = {
    firstName: "",
    startDate: new Date(),
  };

  const validationSchema = [
    yup.object({
      startDate: yup.date().required("Date is required"),
    }),
    yup.object({
      firstName: yup.string().required("Name is required"),
    }),
  ];

  const currentValidationSchema = validationSchema[activeStep];
  const methods = useForm({
    shouldUnregister: false,
    defaultValues,
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
  });
  const { handleSubmit, reset, trigger } = methods;

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <Step1 />;
      case 1:
        return <Step2 />;

      case 2:
        return <div>Two</div>;
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = async () => {
    let isStepValid = false;
    switch (activeStep) {
      case 0:
        isStepValid = await trigger();
        if (isStepValid) {
          setActiveStep(activeStep + 1);
        }

        break;
      case 1:
        isStepValid = await trigger();
        if (isStepValid) {
          setActiveStep(activeStep + 1);
        }
        break;

      case 2:
        setActiveStep(activeStep + 1);
        break;
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FormProvider {...methods}>
        <form>
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
                  <div>Done</div>
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
      </FormProvider>
    </ThemeProvider>
  );
};

export default NewDateComponent;
