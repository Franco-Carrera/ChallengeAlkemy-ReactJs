import React, { useState } from "react";
import axios from "axios";

const Context = React.createContext();

export const HeroContext = ({ children }) => {
  //Promesa setea heroes en search
  const [heroes, setHeroes] = useState([]);

  //Setea estados del team
  const [team, setTeam] = useState([]);

  const [good, setGood] = useState([]);
  const [bad, setBad] = useState([]);

  //Setea message en Notification en login logout
  const [message, setMessage] = useState("");

  //Setea tipo de notification check || error
  const [type, setType] = useState("");

  const [teamPowerstats, setTeamPowerstats] = useState({
    intelligence: 0,
    strength: 0,
    speed: 0,
    durability: 0,
    power: 0,
    combat: 0,
    averageWeight: 0,
    averageHeight: 0,
  });

  const token = localStorage.getItem("token");

  //Función obteniendo token de usuario
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

  //Funcion que busca heroes por el parámetro nombre
  //Al responder se le pasa la funcion 'discardHeroes',
  //esta se guarda en la variable newHeroes y se setea su estado
  //heroes
  const search = (name) => {
    axios
      .get(`http://localhost:5000/${name}`)
      .then((response) => {
        console.log(response.data.results);
        if (response.data.response === "success") {
          let newHeroes = discardHeroes([...response.data.results]);
          setHeroes(newHeroes);
        } else {
          setNotification("error", response.data.error, 4000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Funcion descarta los personajes con powerstats de valor null,
  // sean neutrales || con alignment = ("-")
  const discardHeroes = (array) => {
    let newArray = array.filter(
      (item) =>
        !Object.values(item.powerstats).includes("null") &&
        !item.biography.alignment.includes("-") &&
        !item.biography.alignment.includes("neutral")
    );
    return newArray;
  };

  //Función para evitar que el usuario realice una búsqueda duplicada
  //con una palabra ya buscada.
  const alreadySerched = (word, array) => {
    return array.includes(word);
  };

  //Función que chequea si el heroe ya existe en el team
  //Devuelve Boolean true o false
  const isIn = (heroId, array) => {
    return array.some((hero) => hero.id === heroId);
  };

  //Función para verificar alineación máxima de tres héroes al momento de agregar
  //Devuelve Boolean true o false
  const isAlignmentFull = (heroAlignment) => {
    if (filterHeroesByalignment(heroAlignment, team).length < 3) {
      return false;
    } else return true;
  };

  //Función que filtra por alineación los heroes del team.
  const filterHeroesByalignment = (alignment, array) => {
    const newArr = array.filter(
      (hero) => hero.biography.alignment === alignment
    );
    return newArr;
  };

  //Función agrega heroe al team y setea su estado por good o bad,
  //según su tipo de alineación. Ejecuta función setTeamStats
  const addHero = (object) => {
    const newTeam = [...team, object];
    setTeam(newTeam);
    setTeamstats(object, "+");
    if (object.biography.alignment === "good") {
      setGood([...good, object]);
    } else setBad([...bad, object]);
  };

  //Funcion elimina heroe del team   "" ""
  const deleteHeroFromTeam = (object) => {
    const updateTeam = team.filter((hero) => hero.id !== object.id);
    setTeam(updateTeam);

    setTeamstats(object, "-");
    if (team === 0) {
      setTeamPowerstats(0);
    }
    if (object.biography.alignment === "good") {
      const newArr = good.filter((hero) => hero.id !== object.id);
      setGood(newArr);
    } else {
      const newArr = bad.filter((hero) => hero.id !== object.id);
      setBad(newArr);
    }
  };

  //Función que setea el estado desde teamPowerstats, acumulando  este cada powerstats.
  //A medida que cada heroe se agrega al team, también acumula el peso, la altura del team,
  //Se renderizan estos últimos 2, calculando el promedio, dividiendo su value por team.length.
  const setTeamstats = (object, operator) => {
    if (operator === "+") {
      setTeamPowerstats({
        intelligence:
          parseInt(object.powerstats.intelligence) +
          teamPowerstats.intelligence,
        strength:
          parseInt(object.powerstats.strength) + teamPowerstats.strength,
        speed: parseInt(object.powerstats.speed) + teamPowerstats.speed,
        durability:
          parseInt(object.powerstats.durability) + teamPowerstats.durability,
        power: parseInt(object.powerstats.power) + teamPowerstats.power,
        combat: parseInt(object.powerstats.combat) + teamPowerstats.combat,
        averageWeight:
          parseInt(object.appearance.weight[1].replace(" kg")) +
          teamPowerstats.averageWeight,
        averageHeight:
          parseInt(object.appearance.height[1].replace(" cm")) +
          teamPowerstats.averageHeight,
      });
    } else {
      setTeamPowerstats({
        intelligence:
          teamPowerstats.intelligence -
          parseInt(object.powerstats.intelligence),
        strength:
          teamPowerstats.strength - parseInt(object.powerstats.strength),
        speed: teamPowerstats.speed - parseInt(object.powerstats.speed),
        durability:
          teamPowerstats.durability - parseInt(object.powerstats.durability),
        power: teamPowerstats.power - parseInt(object.powerstats.power),
        combat: teamPowerstats.combat - parseInt(object.powerstats.combat),
        averageWeight:
          teamPowerstats.averageWeight -
          parseInt(object.appearance.weight[1].replace(" kg")),
        averageHeight:
          teamPowerstats.averageHeight -
          parseInt(object.appearance.height[1].replace(" cm")),
      });
    }
  };

  //Función Capital hace mayúscula la primera letra de una palabra
  function capt(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

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
        heroes,
        setHeroes,
        team,
        setTeam,
        good,
        bad,
        teamPowerstats,
        token,
        getToken,
        search,
        alreadySerched,
        isAlignmentFull,
        isIn,
        filterHeroesByalignment,
        addHero,
        deleteHeroFromTeam,
        setTeamstats,
        capt,
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
