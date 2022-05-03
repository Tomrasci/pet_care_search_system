import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const UserValidationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string().required("New password is required"),
  confirmNewPassword: Yup.string()
    .required("Confirm New Password is required")
    .oneOf([Yup.ref("newPassword"), null], "Passwords do not match"),
});

const userFormOptions = {
  resolver: yupResolver(UserValidationSchema),
};

export default {
  UserValidationSchema,
  userFormOptions,
};
