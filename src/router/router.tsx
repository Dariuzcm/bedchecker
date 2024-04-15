import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FooterNavBar } from "../components/FooterNavbar";
import { NotFound } from "../pages/404";
import { HomePage } from "../pages/HomePage";
import { Journeys } from "../pages/Journeys";
import { Login } from "../pages/Login";

export const ReactRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/list" element={<Journeys />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <FooterNavBar />
  </BrowserRouter>
);
