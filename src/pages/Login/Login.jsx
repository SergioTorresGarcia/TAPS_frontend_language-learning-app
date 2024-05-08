import { useEffect, useState } from "react";
import { CButton } from "../../common/CButton/CButton";
import { CInput } from "../../common/CInput/CInput";
import { validame } from "../../utils/functions";
import "./Login.css";
import { LoginUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { useDispatch, useSelector } from "react-redux"
import { login, userData } from "../../app/slices/userSlice"


export const Login = () => {
  const navigate = useNavigate()

  //Redux reading mode
  const rdxUserData = useSelector(userData)
  //Redux writing mode
  const dispatch = useDispatch()

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [tokenStorage, setTokenStorage] = useState(rdxUserData.credentials?.token);

  const [credentialsError, setCredentialsError] = useState({
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
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const checkError = (e) => {
    const error = validame(e.target.name, e.target.value);

    setCredentialsError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const loginMe = async () => {
    try {
      for (let elemento in credentials) {
        if (credentials[elemento] === "") {
          throw new Error("All fields are required");
        }
      }

      const fetched = await LoginUser(credentials);
      const decoded = decodeToken(fetched.token);
      const passport = {
        token: fetched.token,
        decoded: decoded,
      };

      //Saving passport to RDX (with both, token and all the decoded info)
      dispatch(login({ credentials: passport }))
      setMsg(`Hi ${decoded?.username}, welcome to Taps`);
      navigate('/');
    } catch (error) {
      setMsgError(error.message);
    }
  };

  return (
    <>
      <div className="loginDesign">
        <div className="error">Don't have an account yet? <span className="lime" onClick={() => { navigate('/register') }}> Sign up</span> <br /><br /> </div>
        <CInput
          className={`inputDesign ${credentialsError.emailError !== "" ? "inputDesignError" : ""
            }`}
          type={"email"}
          placeholder={"email"}
          name={"email"}
          disabled={""}
          value={credentials.email || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <CInput
          className={`inputDesign ${credentialsError.passwordError !== "" ? "inputDesignError" : ""
            }`}
          type={"password"}
          placeholder={"password"}
          name={"password"}
          disabled={""}
          value={credentials.password || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <CButton
          className={"cButtonDesign"}
          title={"Login"}
          functionEmit={loginMe}
        />
        <div className="error">{credentialsError.emailError || credentialsError.passwordError}</div>
        <div className="error">{msgError}</div>
      </div>
    </>
  );
};
