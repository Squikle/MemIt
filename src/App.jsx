import { Route, Routes, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { TermsSetPage } from "./pages/TermsSetPage";
import { TermsSetsListPage } from "./pages/TermsSetsListPage";
import { LoginPage } from "./pages/LoginPage";
import { useEffect } from "react";
import { check } from "./http/userAPI";
import { useAuthContext } from "./contexts/AuthContext/useAuthContext";
import { TermsPage } from "./pages/TermsPage";

function App() {
  const navigate = useNavigate();
  const authContext = useAuthContext();

  useEffect(() => {
    const navigateToLogin = () => navigate("/login");

    if (!authContext.authorized) navigateToLogin();

    check().catch(() => {
      navigateToLogin();
    });
  }, [navigate, authContext]);

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/sets" element={<TermsSetsListPage />}></Route>
        <Route path="/sets/:termsSetId" element={<TermsSetPage />}></Route>
        <Route path="/terms/:termsSetId" element={<TermsPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
