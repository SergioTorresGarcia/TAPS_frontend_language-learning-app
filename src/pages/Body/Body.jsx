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
import { Play2a } from "../Play2a/Play2a";
import { Play5 } from "../Play5/Play5";
import { NewLevel } from "../NewLevel/NewLevel";
import { AddNewWord } from "../AddNewWord/AddNewWord";
import { AddNewLevel } from "../AddNewLevel/AddNewLevel";




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
      <Route path="/admin/words/new" element={<AddNewWord />} />
      <Route path="/admin/levels/new" element={<AddNewLevel />} />
      <Route path="/play" element={<Play />} />
      <Route path="/play2" element={<Play2 />} />
      <Route path="/play2a" element={<Play2a />} />
      <Route path="/play3" element={<Play3 />} />
      <Route path="/play4" element={<Play4 />} />
      <Route path="/play5" element={<Play5 />} />
      <Route path="/play/congrats" element={<NewLevel />} />
    </Routes>
  );
};
