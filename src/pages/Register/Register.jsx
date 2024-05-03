import { useState } from "react";
import { CInput } from "../../common/CInput/CInput";
import "./Register.css";
import { CButton } from "../../common/CButton/CButton";
import { RegisterUser } from "../../services/apiCalls";
import { validame } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import { Header } from "../../common/Header/Header";
import { Footer } from "../../common/Footer/Footer";

export const Register = () => {
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

  //funcion emit in father, we pass it to custum input
  const inputHandler = (e) => {
    //binding...
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

  //function emit que también está aqui en el padre...en este caso para registrar...
  const registerMe = async () => {
    try {
      for (let elemento in user) {
        if (user[elemento] === "") {
          throw new Error("All fields are required");
        }
      }

      const fetched = await RegisterUser(user);
      setMsgError(fetched.message);

    } catch (error) {
      setMsgError(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="registerDesign">
        <div className="error">Already registered? <a href="./login">Log in here</a> <br /><br /> </div>
        {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
        <CInput
          className={`inputDesign ${userError.usernameError !== "" ? "inputDesignError" : ""
            }`}
          type={"text"}
          placeholder={"username"}
          name={"username"}
          value={user.username || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <CInput
          className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
            }`}
          type={"email"}
          placeholder={"email"}
          name={"email"}
          value={user.email || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />

        <CInput
          className={`inputDesign ${userError.passwordError !== "" ? "inputDesignError" : ""
            }`}
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
      <Footer />
    </>
  );
};
