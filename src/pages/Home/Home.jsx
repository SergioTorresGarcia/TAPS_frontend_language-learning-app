import { useNavigate } from "react-router-dom";
import { Footer } from "../../common/Footer/Footer";
import { Header } from "../../common/Header/Header";
import "./Home.css";

export const Home = () => {
  const navigate = useNavigate();
  const passport = JSON.parse(localStorage.getItem("passport"));
  return (
    <>
      <Header />
      {passport?.token ? (
        <div className="homeDesign" onClick={navigate('/play')}><div className=""><span className="text"><img className="logo" src="../../src/assets/playroundedbuttonoutline_104668.png" alt="" /> </span ></div ></div>

      ) : (
        <div className="homeDesign"><div className="circle"><span className="text">TAPS</span ></div></div >
      )}
      <Footer />
    </>
  );
};
