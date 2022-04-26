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
import AdvertiseBaseEdit from "./Components/CaretakerAdvertisement/AdvertBaseEdit";
import CaretakerCalendar from "./Components/CaretakerAdvertisement/CaretakerCalendar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ReserveFromCalendar from "./Components/OwnerReservations/ReserveFromCalendar";
import ReservationsTable from "./Components/CaretakerAdvertisement/CaretakerAdvertReservations";
import OwnerAdvertiseBase from "./Components/OwnerAdvert/OwnerAdvertBase";
import OwnerAdvertiseBaseEdit from "./Components/OwnerAdvert/OwnerAdvertBaseEdit";
import { ICurrentUser } from "./Interfaces/User/ICurrentUser";
import CaretakerAdvertisement from "./Components/CaretakerAdvertisement/CaretakerAdvertismentLayout";
import MyOwnerAdvertisement from "./Components/OwnerAdvert/MyOwnerAdvertisement";
import MyCaretakerAdvertisement from "./Components/CaretakerAdvertisement/MyCaretakerAdvertisement";
import OwnerAdvertList from "./Components/OwnerAdvert/OwnerAdvertList";

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
  const [currentUser, setCurrentUser] = React.useState({} as ICurrentUser);

  const logOut = () => {
    userApi.logout();
  };

  const loadUsers = () => {
    const user = userApi.getCurrentUser();
    if (user !== null) {
      setCurrentUser(user);
    } else {
      setCurrentUser({} as ICurrentUser);
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
          path={"/OwnerAdvertList"}
          element={<OwnerAdvertList currentUser={currentUser} />}
        ></Route>
        <Route
          path={"/MyCaretakerAdvert/:id"}
          element={<MyCaretakerAdvertisement currentUser={currentUser} />}
        ></Route>
        <Route
          path={"/MyOwnerAdvert/:id"}
          element={<MyOwnerAdvertisement currentUser={currentUser} />}
        ></Route>
        <Route
          path={"/caretakerUpdate/:id"}
          element={<AdvertiseBaseEdit currentUser={currentUser} />}
        ></Route>
        <Route
          path={"/caretakerCalendar/:id"}
          element={<CaretakerCalendar currentUser={currentUser} />}
        ></Route>
        <Route
          path={"/ReserveFromCalendar/:id"}
          element={<ReserveFromCalendar currentUser={currentUser} />}
        ></Route>
        <Route
          path={"/ReservationsTable/:id"}
          element={<ReservationsTable currentUser={currentUser} />}
        ></Route>
        <Route path={"Register"} element={<Register />}></Route>
        <Route path={"Login"} element={<Login loadUsers={loadUsers} />}></Route>
        <Route
          path={"/OwnerAdvertCreate"}
          element={<OwnerAdvertiseBase currentUser={currentUser} />}
        ></Route>
        <Route
          path={"/OwnerAdvertEdit/:id"}
          element={<OwnerAdvertiseBaseEdit currentUser={currentUser} />}
        ></Route>
        <Route
          path={"/CaretakerAdvertisement/:id"}
          element={<CaretakerAdvertisement currentUser={currentUser} />}
        ></Route>
        <Route path={"/"} element={<Home />}></Route>
        ))
      </Routes>
      <Footer></Footer>
    </>
  );
}
