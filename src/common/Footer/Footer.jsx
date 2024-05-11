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
    console.log(rdxUserData);
    return (
        <div className="footerDesign">
            {rdxUserData.credentials?.token ? (
                <>
                    <div className="footMenu">
                        {rdxUserData.credentials.decoded.roleName === "admin" && (
                            <>
                                {location.pathname !== '/admin' ?
                                    <Navigator title={"ADMIN"} destination={"/admin"} />
                                    : <div></div>}

                                {location.pathname === '/admin/words' ?
                                    <>
                                        <Navigator title={"+WORD"} destination={"/admin/words/new"} />
                                    </>
                                    : null}
                                {/* {location.pathname === '/admin/levels' ?
                                    <>
                                        <Navigator title={"+LEVEL"} destination={"/admin/levels/new"} />
                                    </>
                                    : null} */}
                                {/* {location.pathname === '/admin/users' ?
                                    <>
                                        <Navigator title={"+USER"} destination={"/admin/users"} />
                                    </>
                                    : null}
                                {location.pathname === '/admin/roles' ?
                                    <>
                                        <Navigator title={"+ROLE"} destination={"/admin/roles"} />
                                    </>
                                    : null} */}

                            </>
                        )}
                    </div>
                    <div>
                        {(location.pathname === '/')
                            ? <Navigator title={rdxUserData.credentials?.decoded?.username} destination={"/profile/me"} />
                            : ((location.pathname !== '/admin') ? null : <Navigator title={"HOME"} destination={"/"} />)}
                    </div>
                </>
            ) : (
                <div></div>
            )}
        </div>
    );
};
