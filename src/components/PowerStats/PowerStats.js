import { useContext } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Context from "../../context/HeroContext";
import "./PowerStats.css";

const PowerStats = ({ powerstats, max }) => {
  const { capt } = useContext(Context);

  //Objeto powerstats se transforma en array.
  const newPowerstats = Object.entries(powerstats).map(function (element) {
    return {
      name: element[0],
      stat: element[1],
    };
  });

  ///Ordena descendentemente
  if (max === 600) {
    newPowerstats.sort((a, b) => {
      return b.stat - a.stat;
    });
  }

  return (
    <>
      {newPowerstats.map(
        (stat, index) =>
          stat.name !== "averageHeight" &&
          stat.name !== "averageWeight" && (
            <section key={index}>
              <label htmlFor="capt">{`${capt(stat.name)} : ${
                stat.stat
              }/${max}`}</label>
              <ProgressBar variant="success" max={max} now={stat.stat} />
            </section>
          )
      )}
    </>
  );
};

export default PowerStats;
