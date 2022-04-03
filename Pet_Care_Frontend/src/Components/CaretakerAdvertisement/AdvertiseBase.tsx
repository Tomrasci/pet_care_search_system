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
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import moment from "moment";

const steps = [
  "Personal information",
  "Schedule and price",
  "Advertisement details",
];

const theme = createTheme();

// function formatDate(date) {
//   var d = new Date(date),
//     month = "" + (d.getMonth() + 1),
//     day = "" + d.getDate(),
//     year = d.getFullYear();

//   if (month.length < 2) month = "0" + month;
//   if (day.length < 2) day = "0" + day;

//   return [year, month, day].join("-");
// }

export default function AdvertiseBase() {
  const navigate = useNavigate();

  const [priceValues, handlePriceValues] = useFormHook({
    dayPrice: null,
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    age: "",
    work_activities: "",
    experience: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    price: "",
    title: "",
    description: "",
    extra_information: "",
  };

  const validationSchema = [
    yup.object({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      address: yup.string().required("Address is required"),
      phone: yup.string().required("Phone is required"),
      age: yup.number().required("Age is required"),
      work_activities: yup.string().required("Work or activity is required"),
      experience: yup.string().required("Experience is required"),
    }),
    yup.object({
      startDate: yup.date().required("Start date is required"),
      endDate: yup.date().required("End date is required"),
      startTime: yup.string().required("Start time is required"),
      endTime: yup
        .string()
        .required("End time is required")
        .test("is-greater", "end time should be greater", function (value) {
          const { startTime } = this.parent;
          return moment(value, "HH:mm").isSameOrAfter(
            moment(startTime, "HH:mm")
          );
        }),
      price: yup.number().required("Price is required"),
    }),
    yup.object({
      title: yup.string().required("Title is required"),
      description: yup.string().required("Description is required"),
    }),
  ];

  const [activeStep, setActiveStep] = React.useState(0);

  const currentValidationSchema = validationSchema[activeStep];
  const methods = useForm({
    shouldUnregister: false,
    defaultValues,
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
  });
  const { handleSubmit, reset, trigger, getValues } = methods;

  const handleNext = async () => {
    // let isValid = false;

    // switch (activeStep) {
    //   case 0:
    console.log(`start time is ${getValues("startTime")}`);
    console.log(`end time is ${getValues("endTime")}`);
    const isValid = await trigger();
    if (isValid) {
      setActiveStep(activeStep + 1);
    }
    // break;
    // case 1:
    //   isValid = await trigger();
    //   if (isValid) {
    //     setActiveStep(activeStep + 1);
    //   }
    //   break;

    // case 2:
    //   isValid = await trigger();
    //   if (isValid) {
    //     setActiveStep(activeStep + 1);
    //   }
    //   break;
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const createAdvertisement = async () => {
    const newAdvert: ICaretakerAdvertCreate = {
      name: getValues("firstName"),
      surname: getValues("lastName"),
      address: getValues("address"),
      phone: getValues("phone"),
      age: Number(getValues("age")),
      activity: getValues("work_activities"),
      experience: getValues("experience"),
      title: getValues("title"),
      description: getValues("description"),
      extra_information: getValues("extra_information"),
      startDate: new Date(getValues("startDate")),
      endDate: new Date(getValues("endDate")),
      startTime: new Date(getValues("startTime")),
      endTime: new Date(getValues("endTime")),
      day_price: Number(getValues("price")),
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
        return <PersInformation />;
      case 1:
        return <PriceandDates />;

      case 2:
        return <AdvertForm />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FormProvider {...methods}>
        <form action="/">
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
                      {activeStep === steps.length - 1 ? (
                        <Button
                          variant="contained"
                          onClick={createAdvertisement}
                          sx={{ mt: 3, ml: 1 }}
                        >
                          Submit
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 3, ml: 1 }}
                        >
                          Next
                        </Button>
                      )}
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
}

{
  /* <Button
variant="contained"
onClick={handleNext}
sx={{ mt: 3, ml: 1 }}
>
{activeStep === steps.length - 1 ? "Create" : "Next"}
</Button> */
}
