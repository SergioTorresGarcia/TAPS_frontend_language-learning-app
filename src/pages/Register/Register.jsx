import { useState } from "react";
import { CInput } from "../../common/CInput/CInput";
import "./Register.css";
import { CButton } from "../../common/CButton/CButton";
import { RegisterUser, LoginUser } from "../../services/apiCalls";
import { validame } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { decodeToken } from "react-jwt";
import { login } from "../../app/slices/userSlice";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [userError, setUserError] = useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
  });

  const [msgError, setMsgError] = useState("");

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

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    for (let elemento in user) {
      if (user[elemento] === "") {
        errors[elemento + "Error"] = "This field is required";
        isValid = false;
      } else {
        const error = validame(elemento, user[elemento]);
        if (error) {
          errors[elemento + "Error"] = error;
          isValid = false;
        }
      }
    }

    setUserError(errors);
    return isValid;
  };

  const registerMe = async () => {
    try {
      if (!validateForm()) {
        throw new Error("Please fix the validation errors before submitting");
      }

      const registerResponse = await RegisterUser(user);

      if (!registerResponse.success) {
        throw new Error("Registration failed. Please try again.");
      }

      const loginCredentials = {
        email: user.email,
        password: user.password
      };

      const loginResponse = await LoginUser(loginCredentials);

      const decoded = decodeToken(loginResponse.token);
      const passport = {
        token: loginResponse.token,
        decoded: decoded,
      };

      dispatch(login({ credentials: passport }));
      navigate('/');
    } catch (error) {
      setMsgError(error.message);
    }
  };

  return (
    <>
      <div className="registerDesign">
        <div className="error">Already registered?
          <span className="lime" onClick={() => { navigate('/login') }}> Log in here</span><br /><br />
        </div>
        <CInput
          className={`inputDesign ${userError.usernameError !== "" ? "inputDesignError" : ""}`}
          type={"text"}
          placeholder={"username"}
          name={"username"}
          value={user.username || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <CInput
          className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""}`}
          type={"email"}
          placeholder={"email"}
          name={"email"}
          value={user.email || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <CInput
          className={`inputDesign ${userError.passwordError !== "" ? "inputDesignError" : ""}`}
          type={"password"}
          placeholder={"password"}
          name={"password"}
          value={user.password || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <CButton
          className={"cButtonDesign"}
          title={"Register"}
          functionEmit={registerMe}
        />
        <div className="error">{userError.usernameError}</div>
        <div className="error">{userError.emailError}</div>
        <div className="error">{userError.passwordError}</div>
        <div className="error">{msgError}</div>
      </div>
    </>
  );
};
