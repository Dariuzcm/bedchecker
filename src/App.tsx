import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { NotFound } from "./pages/404"
import { Navigation } from "./components/Navigation"
import { FooterNavBar } from "./components/FooterNavbar"
import { Login } from "./pages/Login"

function App() {

  return (
  <>
    <Navigation />
    <main className="p-6 bg-cyan-600 w-full h-[85vh] overflow-auto">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/home"/>} />
          <Route path='/home' element={ <HomePage />} />
          <Route path='/404' element={<NotFound />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </main>
    <FooterNavBar />
  </>
  )
}

export default App
