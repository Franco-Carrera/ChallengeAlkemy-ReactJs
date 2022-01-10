import { useState, useContext, useEffect } from "react";
import Card from "react-bootstrap/Card";
import HeroDetail from "../HeroDetail/HeroDetail";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Context from "../../context/HeroContext";
import PowerStats from "../PowerStats/PowerStats";
import "./Hero.css";
require("react-bootstrap/ModalHeader");

const Hero = ({ hero }) => {
  const {
    team,
    addHero,
    isIn,
    isAlignmentFull,
    deleteHeroFromTeam,
    setNotification,
  } = useContext(Context);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  useEffect(() => {}, [team]);

  const handleAdd = () => {
    if (team.length < 6) {
      if (!isAlignmentFull(hero.biography.alignment) && !isIn(hero.id, team)) {
        addHero(hero);
        setNotification(
          "check correctly!",
          `${hero.name} has been added to team`,
          2500
        );
      }
    } else {
      setNotification("error", `You can only have 6 heroes in your team`, 2500);
    }
  };

  const handleDelete = () => {
    deleteHeroFromTeam(hero);
    setNotification("check", `${hero.name} has been deleted from team`, 2000);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>
          {hero.name}({hero.biography.alignment})
        </Card.Title>
        <Card.Img className="cadImg" variant="top" src={`${hero.image.url}`} />
        <PowerStats powerstats={hero.powerstats} max={100} />
        <Button
          className="col-sm-5  me-3"
          variant="primary"
          onClick={handleShow}
        >
          Details
        </Button>
        {!isIn(hero.id, team) ? (
          team.length < 6 ? (
            <Button
              className="col-sm-5 ms-3"
              variant="success"
              onClick={handleAdd}
            >
              Add
            </Button>
          ) : (
            <Link to="/team/my-team">
              <Button className="col-sm-5 ms-3" variant="secondary">
                Team (6)
              </Button>
            </Link>
          )
        ) : (
          <Button
            className="col-sm-5 ms-3"
            variant="danger"
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}
        <HeroDetail show={show} setShow={setShow} hero={hero} />
      </Card.Body>
    </Card>
  );
};

export default Hero;
