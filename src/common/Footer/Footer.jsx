import { Navigator } from "../Navigator/Navigator";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

export const Footer = () => {
    const navigate = useNavigate();
    const passport = JSON.parse(localStorage.getItem("passport"));

    return (
        <div className="footerDesign footMenu">
            <div>
                {passport?.token ? (<Navigator title={"play"} destination={"/"} />) : ("")}
            </div>
            <div>
                <Navigator title={"rules"} destination={"/rules"} />
            </div>
        </div>
    );
};
