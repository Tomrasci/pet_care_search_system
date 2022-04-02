import { Box } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useFormHook } from "../Utils/useFormHook";
import Validation from "./Validation";
import RegistrationBody from "./RegistrationBody";
import { IUser } from "../Interfaces/User/IUser";
import userApi from "../Api/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register, handleSubmit, reset, formState } = useForm(
    Validation.registerFormOptions
  );
  const { errors } = formState;
  const navigate = useNavigate();

  const [values, handleChange, resetValues] = useFormHook({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    name: "",
    surname: "",
  });

  const registerUser = async () => {
    const userInfo: IUser = {
      username: values.username,
      email: values.email,
      password: values.password,
      phone: values.phone,
      address: values.address,
      name: values.name,
      surname: values.surname,
    };
    resetValues();
    const result = await userApi.userRegister(userInfo);
    toast.success("Registration successful!");
    navigate("/login");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(registerUser)}>
        {/* <Box alignItems="center" justifyContent="center"> */}
        <RegistrationBody
          registerUsername={register("username")}
          usernameError={errors.username}
          username={values.username}
          registerEmail={register("email")}
          emailError={errors.email}
          email={values.email}
          registerPassword={register("password")}
          passwordError={errors.password}
          password={values.password}
          registerConfirmPassword={register("confirmPassword")}
          confirmPasswordError={errors.confirmPassword}
          confirmPassword={values.confirmPassword}
          registerPhone={register("phone")}
          phoneError={errors.phone}
          phone={values.phone}
          registerAddress={register("address")}
          addressError={errors.address}
          address={values.address}
          registerName={register("name")}
          nameError={errors.name}
          name={values.name}
          registerSurname={register("surname")}
          surnameError={errors.surname}
          surname={values.surname}
          handleChange={handleChange}
        />
        {/* </Box> */}
      </form>
    </div>
  );
};
export default Register;
