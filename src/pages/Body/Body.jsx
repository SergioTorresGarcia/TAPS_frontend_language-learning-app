import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { Profile } from "../Profile/Profile";
import { Rules } from "../Rules/Rules";
import { Progress } from "../Progress/Progress";
import { Word } from "../Word/Word";
import { Play } from "../Play/Play";
import { Admin } from "../Admin/Admin";
import { Play2 } from "../Play2/Play2";
import { Play3 } from "../Play3/Play3";
import { Play4 } from "../Play4/Play4";

export const Body = () => {
  return (
    <Routes>
      {/* Aquí iran cada una de las rutas a las VISTAS */}
      <Route path="*" element={<Navigate to={"/"} replace />} />
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile/me" element={<Profile />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/words" element={<Word />} />
      <Route path="/play" element={<Play />} />
      <Route path="/play2" element={<Play2 />} />
      <Route path="/play3" element={<Play3 />} />
      <Route path="/play4" element={<Play4 />} />
    </Routes>
  );
};
