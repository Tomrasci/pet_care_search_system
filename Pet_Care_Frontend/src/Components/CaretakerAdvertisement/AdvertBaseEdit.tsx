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
import { useNavigate, useParams } from "react-router-dom";
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
import { ICaretakerAdvert } from "../../Interfaces/Caretaker/ICaretakerAdvert";
import { IPet } from "../../Interfaces/Caretaker/IPet";
import { IPetCheck } from "../../Interfaces/Caretaker/IPetCheck";
import { IServiceCheck } from "../../Interfaces/Caretaker/IServiceCheck";
import { IService } from "../../Interfaces/Caretaker/IService";
import { ILanguageCheck } from "../../Interfaces/Caretaker/ILanguageCheck";
import { ILanguage } from "../../Interfaces/Caretaker/ILanguage";
import interval from "./TimeIntervals";
import { IDaysObject } from "../../Interfaces/Caretaker/IDaysObject";
import FilterWeekDay from "../../Utils/FilterWeekday";

const steps = [
  "Personal information",
  "Schedule and price",
  "Advertisement details",
];

const theme = createTheme();

export default function AdvertiseBaseEdit({ currentUser }: any) {
  const navigate = useNavigate();

  if (!currentUser) {
    navigate("/Login");
  }

  const { id } = useParams();

  moment.locale("lt");

  const timeInterval = interval.getInitialTimeIntervals();
  const initialDayInterval = interval.getDaysIntervals();

  const [selectedFile, setSelectedFile] = React.useState<File | null>();
  const [preview, setPreview] = React.useState<string>();

  const [advertDetails, setAdvertDetails] = React.useState<ICaretakerAdvert>();

  const defaultValues = {
    name: advertDetails?.name || "",
    surname: advertDetails?.surname || "",
    address: advertDetails?.address || "",
    phone: advertDetails?.phone || "",
    age: advertDetails?.age || "",
    activity: advertDetails?.activity || "",
    experience: advertDetails?.experience || "",
    startDate: advertDetails?.startDate || "",
    endDate: advertDetails?.endDate || "",
    startTime: advertDetails?.startTime || "",
    endTime: advertDetails?.endTime || "",
    day_price: advertDetails?.day_price || "",
    title: advertDetails?.title || "",
    description: advertDetails?.description || "",
    extra_information: advertDetails?.extra_information || "",
  };

  const [timeInterv, setTimeInterv] = React.useState(timeInterval);
  const [mondayInterval, setMondayInterval] = React.useState<string[]>([]);
  const [tuesdayInterval, setTuesdayInterval] = React.useState<string[]>([]);
  const [wednesdayInterval, setWednesdayInterval] = React.useState<string[]>(
    []
  );
  const [thursdayInterval, setThursdayInterval] = React.useState<string[]>([]);
  const [fridayInterval, setFridayInterval] = React.useState<string[]>([]);
  const [saturdayInterval, setSaturdayInterval] = React.useState<string[]>([]);
  const [sundayInterval, setSundayInterval] = React.useState<string[]>([]);

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
      const languagesGet = await languageApi.getLanguages();
      setLanguages(languagesGet);
      const petTypesGet = await petTypeApi.getPetTypes();
      setPetTypes(petTypesGet);
      const serviceTypesGet = await serviceTypeApi.getServiceTypes();
      setServiceTypes(serviceTypesGet);

      let languageArray = languagesGet.map((language: ILanguageType) => {
        return { value: language, checked: false };
      });

      let petArray = petTypesGet.map((pet: IPetType) => {
        return { value: pet, checked: false };
      });
      let serviceArray = serviceTypesGet.map((service: IServiceType) => {
        return { value: service, checked: false };
      });
      setCheckedState(languageArray);
      setSelected(languageArray);
      setCheckedStatePet(petArray);
      setSelectedPet(petArray);
      setCheckedStateService(serviceArray);
      setSelectedService(serviceArray);

      const pets: IPet[] = await caretakerAdvertisementApi.getCaretakerPets(
        Number(id)
      );
      const services = await caretakerAdvertisementApi.getCaretakerServices(
        Number(id)
      );
      const languages = await caretakerAdvertisementApi.getCaretakerLanguages(
        Number(id)
      );

      languageArray = languageArray.map((language: ILanguageCheck) => {
        return {
          value: language.value,
          checked: languages.some(
            (l: ILanguage) => l.language_id === language.value.id
          ),
        };
      });

      petArray = petArray.map((pet: IPetCheck) => {
        return {
          value: pet.value,
          checked: pets.some((p: IPet) => p.pet_type_id === pet.value.id),
        };
      });

      serviceArray = serviceArray.map((service: IServiceCheck) => {
        return {
          value: service.value,
          checked: services.some(
            (s: IService) => s.service_type_id === service.value.id
          ),
        };
      });

      setCheckedState(languageArray);
      setSelected(languageArray);
      setCheckedStatePet(petArray);
      setSelectedPet(petArray);
      setCheckedStateService(serviceArray);
      setSelectedService(serviceArray);
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
      name: yup.string().required("First name is required"),
      surname: yup.string().required("Last name is required"),
      address: yup.string().required("Address is required"),
      phone: yup.string().required("Phone is required"),
      age: yup.number().required("Age is required"),
      activity: yup.string().required("Work or activity is required"),
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

      day_price: yup.number().required("Price is required"),
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
  const { handleSubmit, reset, trigger, getValues, setValue, watch } = methods;

  React.useEffect(() => {
    async function getAdvert() {
      const advertDetails =
        await caretakerAdvertisementApi.getCaretakerAdvertisement(Number(id));
      setAdvertDetails(advertDetails);
      reset(advertDetails);
      const availabilityGet =
        await caretakerAdvertisementApi.getCaretakerAvailability(
          Number(advertDetails?.id)
        );

      const mondayArray = FilterWeekDay(availabilityGet, "Mon");
      const tuesdayArray = FilterWeekDay(availabilityGet, "Tue");
      const wednesdayArray = FilterWeekDay(availabilityGet, "Wed");
      const thursdayArray = FilterWeekDay(availabilityGet, "Thu");
      const fridayArray = FilterWeekDay(availabilityGet, "Fri");
      const saturdayArray = FilterWeekDay(availabilityGet, "Sat");
      const sundayArray = FilterWeekDay(availabilityGet, "Sun");

      setMondayInterval(mondayArray);
      setTuesdayInterval(tuesdayArray);
      setWednesdayInterval(wednesdayArray);
      setThursdayInterval(thursdayArray);
      setFridayInterval(fridayArray);
      setSaturdayInterval(saturdayArray);
      setSundayInterval(sundayArray);
    }

    getAdvert();
  }, []);

  const handleNext = async () => {
    if (activeStep === 0) {
      setClicked(true);
      const isValid = await trigger();
      if (isValid && !error) {
        setActiveStep(activeStep + 1);
        setClicked(false);
      }
    } else if (activeStep === 1) {
      setClickedPet(true);
      setClickedService(true);
      const isValid = await trigger();

      if (isValid && !errorPet && !errorService) {
        setClickedService(false);
        setClickedPet(false);
        setActiveStep(activeStep + 1);
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
      name: getValues("name"),
      surname: getValues("surname"),
      address: getValues("address"),
      phone: getValues("phone"),
      age: Number(getValues("age")),
      activity: getValues("activity"),
      experience: getValues("experience"),
      title: getValues("title"),
      description: getValues("description"),
      extra_information: getValues("extra_information"),
      startDate: new Date(getValues("startDate")),
      endDate: new Date(getValues("endDate")),
      day_price: Number(getValues("day_price")),
      pets: checkedPets,
      services: checkedServices,
      languages: checkedLanguages,
      user_id: currentUser.id,
      monday: mondayInterval,
      tuesday: tuesdayInterval,
      wednesday: wednesdayInterval,
      thursday: thursdayInterval,
      friday: fridayInterval,
      saturday: saturdayInterval,
      sunday: sundayInterval,
    };
    const result = await caretakerAdvertisementApi.editCaretakerAdvertisement(
      Number(id),
      newAdvert
    );
    if (result.status !== 200) {
      toast.error("Advertisement update failed");
    } else {
      toast.success("Advertisement updated successful");
      navigate("/");
    }
  };

  React.useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const daysObject: IDaysObject = {
    timeSelectValue: timeInterv,
    mondayValue: mondayInterval,
    handleMonday: setMondayInterval,
    tuesdayValue: tuesdayInterval,
    handleTuesday: setTuesdayInterval,
    wednesdayValue: wednesdayInterval,
    handleWednesday: setWednesdayInterval,
    thursdayValue: thursdayInterval,
    handleThursday: setThursdayInterval,
    fridayValue: fridayInterval,
    handleFriday: setFridayInterval,
    saturdayValue: saturdayInterval,
    handleSaturday: setSaturdayInterval,
    sundayValue: sundayInterval,
    handleSunday: setSundayInterval,
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
            selectedFile={selectedFile}
            onSelectFile={onSelectFile}
            preview={preview}
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
            daysObject={daysObject}
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
