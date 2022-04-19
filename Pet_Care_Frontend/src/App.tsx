import * as React from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router";
import userApi from "./Api/userApi";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Aboutus from "./Components/Aboutus";
import AdvertiseBase from "./Components/CaretakerAdvertisement/AdvertiseBase";
import Home from "./Components/Home";
import { IUser } from "./Interfaces/User/IUser";
import Footer from "./Layout/Footer";
import Navbar from "./Layout/Navbar";
import CaretakerAdvertList from "./Components/CaretakerAdvertisement/CaretakerAdvertList";
import MyCaretakerAdvertisements from "./Components/CaretakerAdvertisement/MyCaretakerAdvertisements";
import AdvertiseBaseEdit from "./Components/CaretakerAdvertisement/AdvertBaseEdit";
import CaretakerCalendar from "./Components/CaretakerAdvertisement/CaretakerCalendar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ReserveFromCalendar from "./Components/OwnerReservations/ReserveFromCalendar";

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
    path: "/CaretakerAdvertCreate",
    component: <AdvertiseBase />,
  },
  {
    path: "/CaretakerAdvertList",
    component: <CaretakerAdvertList />,
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

  const logOut = () => {
    userApi.logout();
  };

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
        {/* {guestLinksArray.map((link: any, index: any) => (
          <Route path={link.path} element={link.component} key={index}></Route>
        ))} */}
        <Route
          path={"/CaretakerAdvertCreate"}
          element={<AdvertiseBase currentUser={currentUser} />}
        ></Route>
        <Route
          path={"/CaretakerAdvertList"}
          element={<CaretakerAdvertList currentUser={currentUser} />}
        ></Route>
        <Route
          path={"/MyAdverts"}
          element={<MyCaretakerAdvertisements currentUser={currentUser} />}
        ></Route>
        <Route
          path={"/caretakerUpdate/:id"}
          element={<AdvertiseBaseEdit currentUser={currentUser} />}
        ></Route>
        <Route
          path={"/caretakerCalendar"}
          element={<CaretakerCalendar />}
        ></Route>
        <Route
          path={"/ReserveFromCalendar"}
          element={<ReserveFromCalendar />}
        ></Route>
        <Route path={"Register"} element={<Register />}></Route>
        <Route path={"Login"} element={<Login loadUsers={loadUsers} />}></Route>
        <Route path={"/"} element={<Home />}></Route>
        ))
      </Routes>
      <Footer></Footer>
    </>
  );
}
