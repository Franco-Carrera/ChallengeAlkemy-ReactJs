import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import NotificationContext from "../../context/HeroContext";
import "./Notification.css";

const buttonCheck = <FontAwesomeIcon icon={faCheck} />;
const buttonError = <FontAwesomeIcon icon={faEraser} />;

export const Notification = () => {
  const { notification } = useContext(NotificationContext);
  const [type, setType] = useState("");
  const spinner = <div className="spinner-border text-primary" role="status" />;
  const check = <button type="button">{buttonCheck}</button>;
  const error = <button type="button">{buttonError}</button>;

  useEffect(() => {
    setType(notification.type);
  }, [notification.type]);

  if (notification.message === "") {
    return null;
  }

  return (
    <div className="alert d-flex justify-content-center">
      <div
        className="alert row col-sm-6 alert-primary alert-dismissible fade show"
        role="alert"
      >
        <h3>
          {type === "spinner"
            ? spinner
            : type === "check"
            ? check
            : type === "error"
            ? error
            : ""}
          {notification.message}
        </h3>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

export default Notification;
