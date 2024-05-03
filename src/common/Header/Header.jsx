import { Navigator } from "../Navigator/Navigator";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();
  const passport = JSON.parse(localStorage.getItem("passport"));

  const logOut = () => {
    localStorage.removeItem("passport");
    navigate("/login");
  };

  return (
    // <div className="headerDesign">
    //   {/* <Navigator title={"home"} destination={"/"} /> */}

    <div className="headerDesign authMenu">
      <div>
        {passport?.token ? (
          <Navigator title={passport?.decoded?.username} destination={"/profile/me"} />
        ) : (
          <Navigator title={"register"} destination={"/register"} />
        )}
      </div>
      <div>
        {passport?.token ? (
          <div onClick={logOut}><Navigator title={"log out"} destination={"/"} /></div>
        ) : (
          <Navigator title={"login"} destination={"/login"} />
        )}
      </div>
    </div>
  );
};
