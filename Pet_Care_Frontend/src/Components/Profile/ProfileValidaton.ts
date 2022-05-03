import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const profileEditValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Username must be at least 4 characters")
    .required("Username is required")
    .max(50, "Username cannot be more than 50 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Email must be valid")
    .max(50, "Email cannot be more than 50 characters"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string()
    .required("Address is required")
    .max(60, "Address cannot be more than 60 characters"),
  name: Yup.string().required("Name is required").max(50),
  surname: Yup.string().required("Surname is required").max(50),
  city: Yup.string().required("City is required"),
});
const profileEditFormOptions = {
  resolver: yupResolver(profileEditValidationSchema),
};

export default { profileEditValidationSchema, profileEditFormOptions };
