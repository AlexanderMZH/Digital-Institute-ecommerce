import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./style.scss";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div id="not-found">
      <h1>Page not Found...Redirecting to home page</h1>
    </div>
  );
};

export default NotFound;
