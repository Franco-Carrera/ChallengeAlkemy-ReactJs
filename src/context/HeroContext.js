import React, { useState } from "react";
import { searchHero, getToken } from "../utilities/apiHero";

const Context = React.createContext();

export const HeroContext = ({ children }) => {
  //Promesa setea heroes en search
  const [heroes, setHeroes] = useState([]);

  //Setea user true or false en login logout
  const [user, setUser] = useState(false);

  //Setea message en Notification en login logout
  const [message, setMessage] = useState("");

  //Setea tipo de notification check || error
  const [type, setType] = useState("");

  const login = (values) => {
    setNotification("spinner", "Processing", 2000);
    const { email, password } = values;

    getToken(email, password)
      .then((result) => {
        localStorage.setItem("token", result);
        console.log(result);
        setUser(true);
        setNotification();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const logout = () => {
    setNotification("Finish", "See you later", 3000);
    localStorage.clear();
    setTimeout(() => {
      setUser(false);
    }, 500);
  };

  const search = (name) => {
    searchHero(name)
      .then((result) => {
        setHeroes(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setNotification = (type, message, sec) => {
    window.scrollTo(0, 0);
    setType(type);
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, sec);
  };

  ////Se pasan estados al contextProvider
  return (
    <Context.Provider
      value={{
        login,
        logout,
        search,
        user,
        heroes,
        notification: {
          message,
          type,
        },
        setNotification,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
