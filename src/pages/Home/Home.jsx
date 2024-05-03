import { Footer } from "../../common/Footer/Footer";
import { Header } from "../../common/Header/Header";
import "./Home.css";

export const Home = () => {
  return (
    <>
      <Header />
      <div className="homeDesign"><div className="circle"><span className="text">TAPS</span></div></div>
      <Footer />
    </>
  );
};
