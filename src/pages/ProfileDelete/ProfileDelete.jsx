
import { useState } from "react";
import { CButton } from "../../common/CButton/CButton";
import { DeleteProfile } from "../../services/apiCalls";
import "./ProfileDelete.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, userData } from "../../app/slices/userSlice";

export const ProfileDelete = () => {
    //Redux reading mode
    const rdxUserData = useSelector(userData)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [tokenStorage, setTokenStorage] = useState(rdxUserData.credentials.token);

    const logOut = () => {
        dispatch(logout({
            credentials: {
                email: "",
                password: "",
            }
        }));
        navigate("/");
    };

    const deleteProfile = async () => {
        const role = rdxUserData.credentials.decoded.roleName;
        try {
            if (role == 'admin') {
                alert('Admin profile cannot be deleted')
                navigate('/profile/me');
            } else {
                await DeleteProfile(tokenStorage);
                console.log("Profile deleted");

                logOut();
            }


        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <div className="rulesDesign">
                <h3 className="whiteMsg">Sad to let you go...</h3>
                <h3 className="whiteMsg">Happy we've cross paths.</h3>
                <br />
                <div className="">
                    <CButton
                        className={"cButtonDesign cButtonRed"}
                        title={"Delete?"}
                        functionEmit={deleteProfile}
                    />
                    <br />
                    <h2 className="whiteMsg">Thank you!</h2>
                </div>
            </div >
        </>
    );
};