// Profile.jsx
import React, { useState, useEffect } from "react";
import "./Profile.css";
import { GetProfile, UpdateProfile } from "../../services/apiCalls";
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";
import { validame } from "../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { updateUsername } from "../../redux/actions";
import { useNavigate, useLocation } from "react-router-dom";

export const Profile = () => {
  const rdxUserData = useSelector(userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [write, setWrite] = useState("disabled");
  const [tokenStorage, setTokenStorage] = useState(rdxUserData.credentials.token);
  const [loadedData, setLoadedData] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const [userError, setUserError] = useState({
    usernameError: "",
    emailError: "",
  });

  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const checkError = (e) => {
    const error = validame(e.target.name, e.target.value);

    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  useEffect(() => {
    if (!tokenStorage) {
      navigate("/");
    }
  }, [tokenStorage]);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const fetched = await GetProfile(tokenStorage);
        setLoadedData(true);
        setUser({
          username: fetched.data.username,
          email: fetched.data.email,
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (!loadedData) {
      getUserProfile();
    }
  }, [tokenStorage, loadedData]);

  const updateData = async () => {
    try {
      const fetched = await UpdateProfile(tokenStorage, user);
      setUser({
        username: fetched.data.username,
        email: fetched.data.email,
      });
      setWrite("disabled");
      dispatch(updateUsername(fetched.data.username));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="profileDesign">
        {!loadedData ? (
          <div>CARGANDO</div>
        ) : (
          <div className="vertical">
            <div className="leftText">
              {/* Left Text */}
            </div>
            <CInput
              className={`inputDesign ${userError.usernameError !== "" ? "inputDesignError" : ""}`}
              type={"text"}
              placeholder={""}
              name={"username"}
              disabled={write}
              value={user.username || ""}
              onChangeFunction={(e) => inputHandler(e)}
              onBlurFunction={(e) => checkError(e)}
            />
            <CInput
              className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""}`}
              type={"email"}
              placeholder={""}
              name={"email"}
              disabled={"disabled"}
              value={user.email || ""}
              onChangeFunction={(e) => inputHandler(e)}
              onBlurFunction={(e) => checkError(e)}
            />
            <CButton
              className={write === "" ? "cButtonGreen cButtonDesign" : "cButtonDesign"}
              title={write === "" ? <span className="whiteTick">✓</span> : "Edit"}
              functionEmit={write === "" ? updateData : () => setWrite("")}
            />
            <div className="error">{userError.usernameError}</div>
            {/* Delete Profile Button */}
          </div>
        )}
      </div>
    </>
  );
};
