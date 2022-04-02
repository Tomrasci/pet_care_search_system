import * as React from "react";
import { Route, Routes } from "react-router";
import Home from "./Components/Home";
import Footer from "./Layout/Footer";
import Navbar from "./Layout/Navbar";
import Advertisements from "./Components/Advertisements";
import Aboutus from "./Components/Aboutus";
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import SecondFooter from "./Layout/SecondFooter";
import userApi from "./Api/userApi";
import { IUser } from "./Interfaces/User/IUser";
import { useEffect } from "react";
import PersInformation from "./Components/CaretakerAdvertisement/PersInformation";
import PriceandDates from "./Components/CaretakerAdvertisement/PriceandDates";
import AdvertForm from "./Components/CaretakerAdvertisement/AdvertForm";
import AdvertiseBase from "./Components/CaretakerAdvertisement/AdvertiseBase";

const guestLinksArray = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/About",
    component: <Aboutus />,
  },
  {
    path: "/PriceandDates",
    component: <AdvertiseBase />,
  },
];

const authLinksArray = [
  {
    path: "/Register",
    component: <Register />,
  },
];

export default function App() {
  const [currentUser, setCurrentUser] = React.useState({});

  const loadUsers = () => {
    const user = userApi.getCurrentUser();
    if (user !== null) {
      setCurrentUser(user);
    } else {
      setCurrentUser({} as IUser);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);
  return (
    <>
      <Navbar loadUsers={loadUsers} currentUser={currentUser} />
      <Routes>
        {guestLinksArray.map((link: any, index: any) => (
          <Route path={link.path} element={link.component} key={index}></Route>
        ))}
        <Route path={"Register"} element={<Register />}></Route>
        <Route path={"Login"} element={<Login loadUsers={loadUsers} />}></Route>
        ))
      </Routes>
      <Footer></Footer>
    </>
  );
}
