import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import moment from "moment";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import caretakerAdvertisementApi from "../../Api/caretakerAdvertisementApi";
import { ICaretakerAdvertCreate } from "../../Interfaces/Caretaker/ICaretakerAdvertCreate";
import { useFormHook } from "../../Utils/useFormHook";
import AdvertForm from "./AdvertForm";
import PersInformation from "./PersInformation";
import PriceandDates from "./PriceandDates";
import useState from "react";
import { IPetType } from "../../Interfaces/Caretaker/IPetType";
import { IServiceType } from "../../Interfaces/Caretaker/IServiceType";
import petTypeApi from "../../Api/petTypeApi";
import serviceTypeApi from "../../Api/serviceTypeApi";
import languageApi from "../../Api/languageApi";
import { ILanguageType } from "../../Interfaces/Caretaker/ILanguageType";
import isEmpty from "../../Utils/Empty";

const steps = [
  "Personal information",
  "Schedule and price",
  "Advertisement details",
];

const theme = createTheme();

export default function AdvertiseBase({ currentUser }: any) {
  const navigate = useNavigate();

  if (isEmpty(currentUser)) {
    navigate("/Login");
  }

  moment.locale("lt");

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

  const [petTypes, setPetTypes] = React.useState<IPetType[]>([]);
  const [serviceTypes, setServiceTypes] = React.useState<IServiceType[]>([]);
  const [languages, setLanguages] = React.useState<ILanguageType[]>([]);

  const [clicked, setClicked] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [checkedState, setCheckedState] = React.useState<
    { value: ILanguageType; checked: boolean }[]
  >([]);
  const [selected, setSelected] = React.useState<
    { value: ILanguageType; checked: boolean }[]
  >([]);

  const [clickedPet, setClickedPet] = React.useState(false);
  const [errorPet, setErrorPet] = React.useState(false);
  const [checkedStatePet, setCheckedStatePet] = React.useState<
    { value: IPetType; checked: boolean }[]
  >([]);
  const [selectedPet, setSelectedPet] = React.useState<
    { value: IPetType; checked: boolean }[]
  >([]);

  const [clickedService, setClickedService] = React.useState(false);
  const [errorService, setErrorService] = React.useState(false);
  const [checkedStateService, setCheckedStateService] = React.useState<
    { value: IServiceType; checked: boolean }[]
  >([]);
  const [selectedService, setSelectedService] = React.useState<
    { value: IServiceType; checked: boolean }[]
  >([]);

  React.useEffect(() => {
    async function getTypes() {
      const petTypesGet = await petTypeApi.getPetTypes();
      setPetTypes(petTypesGet);
      const serviceTypesGet = await serviceTypeApi.getServiceTypes();
      setServiceTypes(serviceTypesGet);
      const languagesGet = await languageApi.getLanguages();

      setLanguages(languagesGet);

      const petArray = petTypesGet.map((pet: IPetType) => {
        return { value: pet, checked: false };
      });
      const serviceArray = serviceTypesGet.map((service: IServiceType) => {
        return { value: service, checked: false };
      });

      const languageArray = languagesGet.map((language: ILanguageType) => {
        return { value: language, checked: false };
      });

      setCheckedStatePet(petArray);
      setSelectedPet(petArray);
      setCheckedStateService(serviceArray);
      setSelectedService(serviceArray);
      setCheckedState(languageArray);
      setSelected(languageArray);
    }

    getTypes();
  }, []);

  const sendError = (error: boolean) => {
    setError(error);
  };

  const sendErrorPet = (petError: boolean) => {
    setErrorPet(petError);
  };

  const sendErrorService = (serviceError: boolean) => {
    setErrorService(serviceError);
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
      startDate: yup
        .date()
        .typeError("Start date must be valid")
        .required("Start date is required"),
      endDate: yup
        .date()
        .typeError("End date must be valid")
        .required("End date is required"),
      startTime: yup
        .date()
        .typeError("Start time must be valid - select both hours and minutes")
        .required("Start time is required"),
      endTime: yup
        .date()
        .typeError("End time must be valid - select both hours and minutes")
        .required("End time is required")
        .min(yup.ref("startTime"), "End time must be later than start time"),
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
    if (activeStep === 0) {
      setClicked(true);
      const isValid = await trigger();
      if (isValid && !error) {
        setActiveStep(activeStep + 1);
        setClicked(false);
      }
    } else if (activeStep === 1) {
      const isValid = await trigger();
      setClickedPet(true);
      setClickedService(true);
      if (isValid && !errorPet && !errorService) {
        setActiveStep(activeStep + 1);
        setClickedService(false);
        setClickedPet(false);
      }
    } else {
      const isValid = await trigger();
      if (isValid) {
        setActiveStep(activeStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const createAdvertisement = async () => {
    const checkedLanguages = selected.map((language) => language.value.id);
    const checkedPets = selectedPet.map((pet) => pet.value.id);
    const checkedServices = selectedService.map((service) => service.value.id);

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
      pets: checkedPets,
      services: checkedServices,
      languages: checkedLanguages,
      user_id: currentUser.id,
    };
    const result = await caretakerAdvertisementApi.createCaretakerAdvertisement(
      newAdvert
    );
    if (result.status !== 201) {
      toast.error("Advertisement creation failed");
    } else {
      toast.success("Advertisement creation successful");
      navigate("/");
    }
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <PersInformation
            sendError={sendError}
            clicked={clicked}
            setSelected={setSelected}
            languages={languages}
            checkedState={checkedState}
            setCheckedState={setCheckedState}
          />
        );
      case 1:
        return (
          <PriceandDates
            sendErrorPet={sendErrorPet}
            clickedPet={clickedPet}
            setSelectedPet={setSelectedPet}
            checkedStatePet={checkedStatePet}
            setCheckedStatePet={setCheckedStatePet}
            petTypes={petTypes}
            sendErrorService={sendErrorService}
            clickedService={clickedService}
            setSelectedService={setSelectedService}
            checkedStateService={checkedStateService}
            setCheckedStateService={setCheckedStateService}
            serviceTypes={serviceTypes}
          />
        );

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
