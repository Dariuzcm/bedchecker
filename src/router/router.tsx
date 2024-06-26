import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FooterNavBar } from "@/components/FooterNavbar";
import { NotFound } from "@/pages/404";
import { HomePage } from "@/pages/HomePage";
import { Journeys } from "@/pages/Journeys";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import Profile from "@/pages/Profile";
import Validation from "@/pages/Validation";
import { Navigation } from "@/components/Navigation";
import ProfileImageSelector from "@/pages/ProfileImageSelector";
import MovementList from "@/pages/MovementList";
import { Toaster } from "@/shadcdn/ui/toaster";
import MovementProcess from "@/pages/MovementProcess";
import OnCancel from "@/pages/OnCancel";
import MovementItem from "@/pages/MovementItem";

export const ReactRouter = () => {

  return (
    <div className="size-full">
      <BrowserRouter>
        <Navigation key={'navigation'} />
        <main className="p-6 pb-8 w-full h-[85vh] overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/list" element={<Journeys />} />
            <Route path="/register" element={<Register />} />
            <Route path="/validate" element={<Validation />} />
            <Route path="/profile">
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/profile/imgSelector"
                element={<ProfileImageSelector />}
              />
            </Route>
            <Route path="/movements">
              <Route path="/movements" element={<MovementList />} />
              <Route path="/movements/create" element={<MovementProcess />} />
              <Route path="/movements/:id" element={<MovementItem />} />
              <Route path="/movements/cancel" element={<OnCancel />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </main>
        <FooterNavBar />
      </BrowserRouter>
    </div>
  );
};
