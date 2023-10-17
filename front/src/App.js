import React from 'react'
import {Routes,Route} from "react-router-dom"
import Login from './Components/Login'
import Signup from "./Components/Signup"
import Profile from './Components/Profile'

const App = () => {
  return (
    <div>
      <Routes >
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/profile" element={<Profile />}/>
        </Routes> 
    </div>
  )
}

export default App