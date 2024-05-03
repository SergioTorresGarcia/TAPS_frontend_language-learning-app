import { Navigator } from "../Navigator/Navigator";
import "./Footer.css";

import { useSelector } from "react-redux"
import { userData } from "../../app/slices/userSlice"
import { useLocation } from "react-router-dom";

export const Footer = () => {
    //Redux reading mode
    const rdxUserData = useSelector(userData)
    //useLocation to control menu display
    const location = useLocation();

    return (
        <div className="footerDesign">
            {rdxUserData.credentials?.token ? (
                <>
                    <div className="footMenu">
                        {rdxUserData.credentials.decoded.roleName === "admin" && (
                            <Navigator title={"ADMIN"} path="/admin" />
                        )}
                    </div>

                    {(location.pathname !== '/profile/me')
                        ? <Navigator title={rdxUserData.credentials.decoded.username} destination={"/profile/me"} />
                        : <div></div>}
                </>
            ) : (
                <div></div>
            )}
        </div>
    );
};
