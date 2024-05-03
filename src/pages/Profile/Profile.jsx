import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./Profile.css";
import { GetProfile, UpdateProfile } from "../../services/apiCalls";
import { CInput } from "../../common/CInput/CInput";
import dayjs from "dayjs";
import { Header } from "../../common/Header/Header";
import { CButton } from "../../common/CButton/CButton";
import { Footer } from "../../common/Footer/Footer";

export const Profile = () => {
  const datosUser = JSON.parse(localStorage.getItem("passport"));
  const navigate = useNavigate();

  const [write, setWrite] = useState("disabled");
  const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
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
  }, [user]);

  const updateData = async () => {

    try {
      const fetched = await UpdateProfile(tokenStorage, user)

      setUser({
        username: fetched.data.username,
        email: fetched.data.email
      })

      setWrite("disabled")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Header />
      <div className="profileDesign">
        {!loadedData ? (
          <div>CARGANDO</div>
        ) : (
          <div>
            <CInput
              className={`inputDesign ${userError.usernameError !== "" ? "inputDesignError" : ""
                }`}
              type={"text"}
              placeholder={""}
              name={"username"}
              disabled={write}
              value={user.username || ""}
              onChangeFunction={(e) => inputHandler(e)}
              onBlurFunction={(e) => checkError(e)}
            />
            <CInput
              className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
                }`}
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
              title={write === "" ? "Confirm" : "Edit"}
              functionEmit={write === "" ? updateData : () => setWrite("")}
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
