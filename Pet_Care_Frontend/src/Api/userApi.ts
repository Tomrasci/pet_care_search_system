import { IUser } from "../Interfaces/User/IUser";
import http from "../Utils/httpRequestBody";
import { toast } from "react-toastify";
import authHeader from "../Authentication/authHeader";
import { IUserChange } from "../Interfaces/User/IUserChange";

const userRegister = async (user: IUser) => {
  return http.post("/register", user);
};

const login = async (email: string, password: string) => {
  return http
    .post("/login", { email, password })
    .then((response) => {
      if (response.data.accessToken) {
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

const changeProfile = async (user: IUser) => {
  return http.put("/updateProfile", user, {
    headers: authHeader(),
  });
};

const getUserDetails = async () => {
  const { data, status } = await http.get("/getUserDetails", {
    headers: authHeader(),
  });

  return data;
};

const changeUserPassword = async (passwordObject: any) => {
  return http.put("/changePassword", passwordObject, {
    headers: authHeader(),
  });
};

const getUserList = async () => {
  const { data, status } = await http.get("/getUsers", {
    headers: authHeader(),
  });
  return data;
};

const updateUser = async (user: IUserChange) => {
  return http.put("/updateUser", user, {
    headers: authHeader(),
  });
};
const deleteUser = async (id: number) => {
  return http.delete(`/deleteUser/${id}`, {
    headers: authHeader(),
  });
};

export default {
  userRegister,
  login,
  logout,
  getCurrentUser,
  getUserDetails,
  changeProfile,
  changeUserPassword,
  getUserList,
  updateUser,
  deleteUser,
};
