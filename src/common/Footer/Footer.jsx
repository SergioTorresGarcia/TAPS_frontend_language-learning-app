import { Navigator } from "../Navigator/Navigator";
import "./Footer.css";

import { useSelector } from "react-redux"
import { userData } from "../../app/slices/userSlice"
import { useLocation } from "react-router-dom";

export const Footer = () => {
    // Redux reading mode
    const rdxUserData = useSelector(userData);
    // Extract username from Redux store state
    const username = rdxUserData.credentials?.decoded?.username;
    // useLocation to control menu display
    const location = useLocation();
    const loc = location.pathname;

    return (
        <div className="footerDesign">
            {rdxUserData.credentials?.token ? (
                <>
                    <div className="footMenu">
                        {rdxUserData.credentials.decoded.roleName === "admin" && (
                            <>
                                {loc === '/' ?
                                    <Navigator title={"ADMIN"} destination={"/admin"} />
                                    : null}
                                {loc !== '/admin' ?
                                    <Navigator title={"HOME"} destination={"/"} />
                                    : null}
                                {loc === '/admin/words' ?
                                    <Navigator title={"+WORD"} destination={"/admin/words/new"} />
                                    : null}
                            </>
                        )}
                    </div>
                    <div>
                        {(loc === '/')
                            ? <Navigator title={username} destination={"/profile/me"} />
                            : ((loc !== '/admin') ? null : <Navigator title={"HOME"} destination={"/"} />)}
                    </div>
                </>
            ) : (
                <div></div>
            )}
        </div>
    );
};
