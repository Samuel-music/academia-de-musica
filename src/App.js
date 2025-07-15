import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Importação de páginas
import MainPage from "./pages/home";
//import Login from "./pages/Login";
/*import EvolutionProcess from "./pages/EvolutionProcess";
import AnnounceGroups from "./pages/AnnounceGroups";*/

function App() {
  const [token, setTokenState] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setTokenState(storedToken);
    }
  }, []);

  const setToken = (token) => {
    setTokenState(token);
    localStorage.setItem("authToken", token);
  };

  const ProtectedRoute = ({ element, ...rest }) => {
    return token ? element : <Navigate to="/login" />;
    //return token ? element : <Navigate to="/main" />;
  };

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/main" />} />
      <Route path="/main" element={<MainPage setToken={setToken} />} />
      {/*<Route path="/login" element={<Login setToken={setToken} />} />*/}
      {/*<Route path="/main" element={<ProtectedRoute element={<MainPage token={token} />} />} />
      {/*<Route path="/evolution" element={<ProtectedRoute element={<EvolutionProcess token={token} />} />} />
      <Route path="/announce-groups" element={<ProtectedRoute element={<AnnounceGroups />} />} />
      <Route path="*" element={<Navigate to="/login" />} />*/}
    </Routes>
  );
}

export default App;