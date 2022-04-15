import React from "react";
import withRouter from "../Utils/withRouter";
const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
const AuthVerify = (props: any) => {
  props.history.listen(() => {
    let validUser;
    let user = localStorage.getItem("user");
    if (user !== null) {
      validUser = JSON.parse(user);
    }
    if (validUser) {
      const decodedJwt = parseJwt(validUser.accessToken);
      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  });
  return <div></div>;
};
export default withRouter(AuthVerify);
