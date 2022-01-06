import React, { useContext, useState, useEffect } from "react";
////FontAwesomeIcon
import NotificationContext from "../../context/HeroContext";
import "./Notification.css";

export const Notification = () => {
  const { notification } = useContext(NotificationContext);
  const [type, setType] = useState("");
  const spinner = <div className="spinner-border text-primary" role="status" />;
  const check = <button type="button" />;
  const error = <button type="button" />;

  useEffect(() => {
    //Se puede usar sin return
    return () => {
      setType(notification.type);
    };
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
          {type === "spiner"
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
