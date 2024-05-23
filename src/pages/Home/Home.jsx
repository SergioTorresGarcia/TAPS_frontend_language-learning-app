import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Home = () => {
  //Redux reading mode
  const rdxUserData = useSelector(userData);
  //Redux writing mode
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [showGif, setShowGif] = useState(false);

  const handleClick = () => {
    setShowGif(true); // Show the GIF when the button is clicked
    setTimeout(() => {
      setShowGif(false); // Hide the GIF after a certain duration (e.g., 30 seconds)
    }, 30000);
  };

  return (
    <>
      <div className="homeDesign" >
        {rdxUserData.credentials?.token ? (

          <div className="logo" onClick={() => { navigate('/play') }}><img className="logo" src="src/assets/playBtn.jpg" alt="click the play button to start the game" /></div>

        ) : (

          <div className="homeDesign">
            {!showGif && <div className="circle2" onClick={handleClick}>
              <span className="whiteTick">TAPS</span>
            </div>}
            {showGif && <div>
              <p className="whiteText" onClick={() => setShowGif(false)}></p>
              <img src="src/assets/video/demoGame.gif" alt="GAME DEMO" className="overDemo" />
            </div>}
          </div>

        )}
      </div>
    </>
  );
};
