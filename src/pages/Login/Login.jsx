import { useEffect, useState } from "react";
import { CButton } from "../../common/CButton/CButton";
import { CInput } from "../../common/CInput/CInput";
import { validame } from "../../utils/functions";
import "./Login.css";
import { LoginUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { Header } from "../../common/Header/Header";
import { Footer } from "../../common/Footer/Footer";


export const Login = () => {
  const datosUser = JSON.parse(localStorage.getItem("passport"));
  const navigate = useNavigate();
  const [tokenStorage, setTokenStorage] = useState(datosUser?.token);

  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });

  const [credencialesError, setCredencialesError] = useState({
    emailError: "",
    passwordError: "",
  });

  const [msgError, setMsgError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (tokenStorage) {
      navigate("/");
    }
  }, [tokenStorage]);

  const inputHandler = (e) => {
    setCredenciales((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const checkError = (e) => {
    const error = validame(e.target.name, e.target.value);

    setCredencialesError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const loginMe = async () => {
    try {
      for (let elemento in credenciales) {
        if (credenciales[elemento] === "") {
          throw new Error("All fields are required");
        }
      }

      const fetched = await LoginUser(credenciales);
      const decoded = decodeToken(fetched.token);
      const passport = {
        token: fetched.token,
        decoded: decoded,
      };

      localStorage.setItem("passport", JSON.stringify(passport));

      setMsg(`Hi ${decoded.username}, welcome to Taps`);
      navigate('/');
    } catch (error) {
      setMsgError(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="loginDesign">
        <div className="error">Don't have an account yet? <a href="./register">Sign up</a> <br /><br /> </div>
        <CInput
          className={`inputDesign ${credencialesError.emailError !== "" ? "inputDesignError" : ""
            }`}
          type={"email"}
          placeholder={"email"}
          name={"email"}
          disabled={""}
          value={credenciales.email || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <CInput
          className={`inputDesign ${credencialesError.passwordError !== "" ? "inputDesignError" : ""
            }`}
          type={"password"}
          placeholder={"password"}
          name={"password"}
          disabled={""}
          value={credenciales.password || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />

        <CButton
          className={"cButtonDesign"}
          title={"Login"}
          functionEmit={loginMe}
        />
        <div className="error">{credencialesError.emailError || credencialesError.passwordError}</div>
        {/* <div className="error">{}</div> */}
        <div className="error">{msgError}</div>
      </div>

      <Footer />
    </>
  );
};
