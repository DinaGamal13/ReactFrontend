import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home  from './Pages/Home'
import AddPost from './Pages/AddPost'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<AddPost />} />
          <Route path="/posts/edit/:id" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
