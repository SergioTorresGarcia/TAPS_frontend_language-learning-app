import { Navigator } from "../Navigator/Navigator";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../../app/slices/userSlice";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Header = () => {
  //Redux reading mode
  const rdxUserData = useSelector(userData);
  const navigate = useNavigate;
  //Redux writing mode
  const dispatch = useDispatch();

  const location = useLocation();

  const logOut = () => {
    dispatch(logout({ credentials: {} }));
    navigate("/login");
  };

  return (
    <div className="headerDesign">
      <div>
        {rdxUserData.credentials?.token ? (

          (location.pathname == '/profile/me' || location.pathname == '/rules' || location.pathname == '/progress')
            ? (<div className="authMenu"><Navigator title={"⇠"} destination={"/"} /> </div>)
            : (<div className="topMenu">
              <div onClick={logOut}><Navigator title={"log out"} destination={"/"} /></div>

            </div>)

        ) : (

          (location.pathname == '/login' || location.pathname == '/register')
            ? <Navigator title={"⇠"} destination={"/"} />
            : <Navigator title={"login"} destination={"/login"} />

        )}
      </div>
    </div>
  );
};
