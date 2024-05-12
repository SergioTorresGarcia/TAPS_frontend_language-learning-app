import { Navigator } from "../Navigator/Navigator";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../../app/slices/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
  //Redux reading mode
  const rdxUserData = useSelector(userData);
  const navigate = useNavigate;
  //Redux writing mode
  const dispatch = useDispatch();

  const [showGit, setShowGif] = useState(false);

  const location = useLocation();
  const loc = location.pathname;

  const logOut = () => {
    dispatch(logout({
      credentials: {
        email: "",
        password: "",
      }
    }));
    navigate("/login");
  };

  return (
    <div className="headerDesign">
      <div>
        {rdxUserData.credentials?.token ? (
          (loc === '/' || loc === '/rules' || loc === '/progress')
            ? (
              loc === '/'
                ? <div onClick={logOut}><Navigator title={"log out"} destination={"/"} /></div>
                : <div onClick={() => setShowGif(false)}><Navigator title={"⇠"} destination={"/profile/me"} /></div>
            )
            : <Navigator title={"⇠"} destination={"/"} />
        ) : (

          loc === '/login' || loc === '/register' ? (
            <Navigator title={"⇠"} destination={"/"} />
          ) : (
            <Navigator title={"log2play"} destination={"/login"} />
          )
        )}
      </div>
    </div>
  );
};
