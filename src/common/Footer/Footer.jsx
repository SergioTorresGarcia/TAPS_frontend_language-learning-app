import { Navigator } from "../Navigator/Navigator";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

export const Footer = () => {
    const navigate = useNavigate();
    const passport = JSON.parse(localStorage.getItem("passport"));

    return (
        <div className="footerDesign">
            {passport?.token ? (
                <>
                    <div className="footMenu">
                        {/* <Navigator title={"PLAY"} destination={"/"} /> */}
                    </div>


                    <div>
                        <Navigator title={passport?.decoded?.username} destination={"/profile/me"} />
                    </div>
                </>
            ) : (
                <div></div>
            )}
        </div>
    );
};
