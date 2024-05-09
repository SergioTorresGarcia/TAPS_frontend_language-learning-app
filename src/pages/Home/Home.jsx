import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  //Redux reading mode
  const rdxUserData = useSelector(userData);
  //Redux writing mode
  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <>
      <div className="homeDesign">
        {rdxUserData.credentials?.token ? (

          <div className="logo" onClick={() => { navigate('/play') }}><img className="logo" src="../../src/assets/playroundedbuttonoutline_104668.png" alt="click the play button to start the game" /></div>

        ) : (

          <div className="homeDesign"><div className="circle2 box-shadow"><span className="whiteTick">TAPS</span ></div></div>

        )}
      </div>
    </>
  );
};
