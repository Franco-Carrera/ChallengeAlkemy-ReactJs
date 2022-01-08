import React, { useState } from "react";
import axios from "axios";

const Context = React.createContext();

export const HeroContext = ({ children }) => {
  //Promesa setea heroes en search
  const [heroes, setHeroes] = useState([]);

  //Setea estados del team
  const [team, setTeam] = useState([]);

  //Setea message en Notification en login logout
  const [message, setMessage] = useState("");

  //Setea tipo de notification check || error
  const [type, setType] = useState("");

  const token = localStorage.getItem("token");

  const getToken = async (email, password) => {
    try {
      const res = await axios.post(`http://challenge-react.alkemy.org/`, {
        email,
        password,
      });
      let data = res.data.token;
      return data;
    } catch (err) {
      let data = err.response.data;

      return data;
    }
  };

  //Funcion que busca heroes y setea su estado
  const search = (name) => {
    axios
      .get(`http://localhost:5000/${name}`)
      .then((response) => {
        console.log(response.data.results);
        const newHeroes = [...response.data.results, ...heroes];
        setHeroes(newHeroes);
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
        token,
        getToken,
        search,
        heroes,
        team,
        setTeam,
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
