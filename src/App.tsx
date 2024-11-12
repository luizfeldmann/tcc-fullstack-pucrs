import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import About from "./pages/About/About.tsx";
import Login from "./pages/Login/Login.tsx";
import Signup from "./pages/Signup/Signup.tsx";
import Verify from "./pages/Verify/Verify.tsx";
import ResetPassword from "./pages/ResetPassword/ResetPassword.tsx";
import ChangePassword from "./pages/ChangePassword/ChangePassword.tsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/change-password/:token" element={<ChangePassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
