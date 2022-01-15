import React, {useContext} from "react";
import { AuthProvider, AuthContext } from "./Contexts/auth";

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

const AppRoutes = () => {
    const Private = ({children})=>{
         const { authenticated, loading } = useContext(AuthContext)
         if (loading) {
             return <div className="loading">Carregando...</div>  
         }
         if (!authenticated) {
             return <Navigate to="/login" />
         }

         return children
    }
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/" element={<Private><MainPage /></Private>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
