import { Route, Routes } from "react-router-dom"
import { Login, Signup, Home } from "./pages/index"
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App;