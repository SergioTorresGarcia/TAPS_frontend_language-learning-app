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
    const loc = location.pathname;
    return (
        <div className="footerDesign">
            {rdxUserData.credentials?.token ? (
                <>
                    <div className="footMenu">
                        {rdxUserData.credentials.decoded.roleName === "admin" && (
                            <>
                                {loc !== '/admin' ?
                                    <Navigator title={"ADMIN"} destination={"/admin"} />
                                    : <div></div>}

                                {loc === '/admin/words' ?
                                    <>
                                        <Navigator title={"+WORD"} destination={"/admin/words/new"} />
                                    </>
                                    : null}
                            </>
                        )}
                    </div>
                    <div>
                        {(loc === '/')
                            ? <Navigator title={rdxUserData.credentials?.decoded?.username} destination={"/profile/me"} />
                            : ((loc !== '/admin') ? null : <Navigator title={"HOME"} destination={"/"} />)}
                    </div>
                </>
            ) : (
                <div></div>
            )}
        </div>
    );
};
