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

const steps = [
  "Personal information",
  "Schedule and price",
  "Advertisement details",
];

const theme = createTheme();

export default function AdvertiseBase() {
  const navigate = useNavigate();

  const [dateStart, setDateStart] = React.useState<Date | null>(null);
  const [dateEnd, setDateEnd] = React.useState<Date | null>(null);
  const [timeStart, setTimeStart] = React.useState<Date | null>(null);
  const [timeEnd, setTimeEnd] = React.useState<Date | null>(null);

  const [priceValues, handlePriceValues] = useFormHook({
    dayPrice: null,
  });

  const { register, handleSubmit, trigger, formState } = useForm();

  const { errors } = formState;

  const required = {
    value: true,
    message: "This field is required",
  };

  const [personalValues, handlePersonalValues, resetPersonalValues] =
    useFormHook({
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      age: null,
      work_activities: "",
      experience: "",
    });

  const [advertValues, handleAdvertValues, resetAdvertValues] = useFormHook({
    title: "",
    description: "",
    extra_information: "",
  });
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = async () => {
    let isValid = false;

    switch (activeStep) {
      case 0:
        isValid = await trigger(["firstName"], { shouldFocus: true });
        console.log(`first one ${isValid}`);
        if (isValid) {
          setActiveStep(activeStep + 1);
        }
        break;
      case 1:
        isValid = await trigger(["startDate"], { shouldFocus: true });
        console.log(`second one ${isValid}`);
        if (isValid) {
          console.log("its valid");
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

  const createAdvertisement = async () => {
    const newAdvert: ICaretakerAdvertCreate = {
      name: personalValues.firstName,
      surname: personalValues.lastName,
      address: personalValues.address,
      phone: personalValues.phone,
      age: personalValues.age,
      activity: personalValues.work_activities,
      experience: personalValues.experience,
      title: personalValues.title,
      description: personalValues.description,
      extra_information: personalValues.extra_information,
      startDate: personalValues.dateStart,
      endDate: personalValues.dateEnd,
      startTime: personalValues.timeStart,
      endTime: personalValues.timeEnd,
      day_price: priceValues.dayPrice,
    };
    const result = await caretakerAdvertisementApi.createCaretakerAdvertisement(
      newAdvert
    );
    console.log(result);
    toast.success("Advertisement creation successful");
    navigate("/");
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <PersInformation
            firstName={personalValues.firstName}
            registerFirstName={register("firstName", { required })}
            firstNameError={errors.firstName}
            lastName={personalValues.lastName}
            address={personalValues.address}
            phone={personalValues.phone}
            age={personalValues.age}
            work_activities={personalValues.work_activities}
            experience={personalValues.experience}
            handlePersonalValues={handlePersonalValues}
          />
        );
      case 1:
        return (
          <PriceandDates
            startDate={dateStart}
            registerStartDate={register("startDate", { required })}
            startDateError={errors.startDate}
            endDate={dateEnd}
            registerEndDate={register("endDate")}
            endDateError={errors.endDate}
            startTime={timeStart}
            registerStartTime={register("startTime")}
            startTimeError={errors.startTime}
            endTime={timeEnd}
            registerEndTime={register("endTime")}
            endTimeError={errors.endTime}
            dayPrice={priceValues.dayPrice}
            registerDayPrice={register("dayPrice")}
            dayPriceError={errors.dayPrice}
            setDateStart={setDateStart}
            setDateEnd={setDateEnd}
            setTimeStart={setTimeStart}
            setTimeEnd={setTimeEnd}
            handlePriceValues={handlePriceValues}
          />
        );

      case 2:
        return (
          <AdvertForm
            title={advertValues.title}
            description={advertValues.description}
            extra_information={advertValues.title}
            handleAdvertValues={handleAdvertValues}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <form>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Advertisement creation
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                createAdvertisement()
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
}
