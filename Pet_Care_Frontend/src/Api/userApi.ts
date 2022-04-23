import { IUser } from "../Interfaces/User/IUser";
import http from "../Utils/httpRequestBody";
import { toast } from "react-toastify";

const userRegister = async (user: IUser) => {
  return http.post("/register", user);
};

const login = async (email: string, password: string) => {
  return http
    .post("/login", { email, password })
    .then((response) => {
      if (response.data.accessToken) {
        console.log(`response data is ${JSON.stringify(response.data)}`);
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return "Success";
    })
    .catch(function (error) {
      if (error.response) {
        return error.response.status === 401
          ? toast.error(`Invalid username or password`)
          : toast.error(`There was a problem logging in`);
      }
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  if (user === null) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export default { userRegister, login, logout, getCurrentUser };
