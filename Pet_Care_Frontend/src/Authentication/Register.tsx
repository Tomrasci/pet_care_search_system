import { Box, SelectChangeEvent } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useFormHook } from "../Utils/useFormHook";
import Validation from "./Validation";
import RegistrationBody from "./RegistrationBody";
import { IUser } from "../Interfaces/User/IUser";
import userApi from "../Api/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import isEmpty from "../Utils/Empty";

const Register = () => {
  const { register, handleSubmit, reset, formState } = useForm(
    Validation.registerFormOptions
  );
  const { errors } = formState;
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = React.useState<File | undefined>();
  const [preview, setPreview] = React.useState<string>();

  React.useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const [values, handleChange, resetValues] = useFormHook({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    name: "",
    surname: "",
    city: "",
  });

  const [role, setRole] = React.useState("");
  const [showRoleError, setShowRoleError] = React.useState(false);

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const registerUser = async () => {
    if (!role) {
      setShowRoleError(true);
    } else {
      const userInfo: IUser = {
        username: values.username,
        email: values.email,
        password: values.password,
        phone: values.phone,
        address: values.address,
        name: values.name,
        surname: values.surname,
        role: Number(role),
        city: values.city,
      };
      // resetValues();
      const result = await userApi.userRegister(userInfo);
      console.log(`result data is ${JSON.stringify(result.data)}`);
      const imageUpload = await userApi.uploadUserImage(
        result.data.id,
        selectedFile
      );
      if (imageUpload !== 200) {
        toast.error("User registration failed");
      } else {
        toast.success("Registration successful!");
        navigate("/login");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(registerUser)}>
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
          registerCity={register("city")}
          cityError={errors.city}
          city={values.city}
          role={role}
          showRoleError={showRoleError}
          setShowRoleError={setShowRoleError}
          handleRoleChange={handleRoleChange}
          selectedFile={selectedFile}
          onSelectFile={onSelectFile}
          preview={preview}
        />
      </form>
    </div>
  );
};
export default Register;
