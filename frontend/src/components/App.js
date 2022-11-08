import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Cards from "./pages/Cards";

import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import * as auth from "../utils/auth";
import { api } from "../utils/Api";
import InfoTooltip from "./InfoTooltip";
import {
  INFOTOOLTIP_MESSAGE_DEFAULT,
  INFOTOOLTIP_MESSAGE_OK,
  INFOTOOLTIP_MESSAGE_ERR,
} from "../utils/constants";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const history = useHistory();

  const [isRegistered, setIsRegistered] = React.useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = React.useState(
    INFOTOOLTIP_MESSAGE_DEFAULT
  );

  const handleLogin = (email, password) => {
    return auth.authorize(email, password).then((data) => {
      setIsLoggedIn(true);
    });
  };

  const handleRegister = (email, password) => {
    return auth
      .register(email, password)
      .then(() => {
        setIsRegistered(true);
        setInfoTooltipMessage(INFOTOOLTIP_MESSAGE_OK);
      })
      .catch((err) => {
        setIsRegistered(false);
        setInfoTooltipMessage(INFOTOOLTIP_MESSAGE_ERR);
        return Promise.reject(err);
      });
  };

  const handleSignOut = () => {
    auth.signout().then((data) => {
      localStorage.removeItem("jwt");
      setIsLoggedIn(false);
      setEmail("");
      history.push("/signin");
    });
  };

  const tokenCheck = () => {
      api.getUserInfo()
      .then((data) => {
        setIsLoggedIn(true);
        setEmail(data.email);
      })
      .catch((err) => {
        switch (err) {
          case 401:
            console.log(`${err} - Необходима авторизация`);
            break;
          default:
            console.log(err);
        };
      });
  };

  const handleInfoTooltipClose = () => {
    setInfoTooltipMessage(INFOTOOLTIP_MESSAGE_DEFAULT);
    if (isRegistered) history.push("/login");
  };

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (!isLoggedIn) return;
    history.push("/");
  }, [isLoggedIn]);

  return (
    <React.Fragment>
      <Switch>
        <Route path="/signin">
          <Login onLogin={handleLogin} />
        </Route>

        <Route path="/signup">
          <Register onRegister={handleRegister} />
        </Route>

        <ProtectedRoute path="/" loggedIn={isLoggedIn}>
          <Cards
            onSignOut={handleSignOut}
            email={email}
            onTokenCheck={tokenCheck}
          />
        </ProtectedRoute>
      </Switch>
      {!!infoTooltipMessage.icon && (
        <InfoTooltip
          onClose={handleInfoTooltipClose}
          message={infoTooltipMessage}
        />
      )}
    </React.Fragment>
  );
}
