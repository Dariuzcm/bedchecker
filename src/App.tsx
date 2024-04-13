import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { NotFound } from "./pages/404"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/home"/>} />
          <Route path='/home' element={ <HomePage />} />
          <Route path='/404' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
