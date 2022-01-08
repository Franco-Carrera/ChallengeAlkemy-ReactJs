import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const AuthUser = ({ children }) => {
  const history = useHistory();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      history.pushState("/login");
    }
  }, [history]);

  return <>{children}</>;
};

export default AuthUser;
