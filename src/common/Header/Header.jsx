import { Navigator } from "../Navigator/Navigator";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const passport = JSON.parse(localStorage.getItem("passport"));

  const logOut = () => {
    localStorage.removeItem("passport");
    navigate("/login");
  };

  return (
    // <div className="headerDesign">
    //   {/* <Navigator title={"home"} destination={"/"} /> */}

    <div className="headerDesign">

      <div>
        {passport?.token ? (

          (location.pathname == '/profile/me' || location.pathname == '/rules')
            ? (<div className="authMenu"><Navigator title={"⇠"} destination={"/"} /> </div>)
            : (<div className="authMenu" onClick={logOut}><Navigator title={"log out"} destination={"/"} /></div>)


        ) : (
          (location.pathname == '/login' || location.pathname == '/register')
            ? <Navigator title={"⇠"} destination={"/"} />
            : <Navigator title={"login"} destination={"/login"} />


          // (location.pathname == '/register' ? <Navigator title={"register"} destination={"/login"} /> : )




        )}
      </div>
    </div>
  );
};
