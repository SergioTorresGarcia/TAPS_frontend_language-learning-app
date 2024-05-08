import { useLocation, useNavigate } from "react-router-dom";

export const validame = (type, value) => {
  switch (type) {
    case "name":
    case "username":
    case "nombre":
    case "surname":
    case "cognom":
      if (value.length < 3) {
        return "Username must be at least 3 characters long.";
      }

      return "";

    case "email":
    case "e-mail":
    case "correo":
    case "mail":
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      if (!emailRegex.test(value)) {
        return "Invalid email format.";
      }

      return "";

    case "password":
    case "contraseña":
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,14}$/;
      if (!passwordRegex.test(value)) {
        return "Password must have at least 8 characteres (incl. number, small & big letters)";
      }

      return "";
    default:
      console.log("it is all good");
  }
};
