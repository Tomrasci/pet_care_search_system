import { IUser } from "../Interfaces/User/IUser";
import http from "../Utils/httpRequestBody";

const userRegister = async (user: IUser) => {
  return http.post("/register", user);
};

const login = async (email: string, password: string) => {
  return http.post("/login", { email, password }).then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
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
