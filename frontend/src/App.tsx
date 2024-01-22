import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Todo from './pages/Todo'
import axios from 'axios'

function App() {

  axios.defaults.baseURL = 'http://localhost:3000'

  return (

    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/todo/:user' element={<Todo/>} />


    </Routes>
    </BrowserRouter>
  )
}

export default App
