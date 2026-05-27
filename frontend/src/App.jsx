import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Home'
import EditTask from './EditTask'
export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/edit' element={<EditTask />}/>
      </Routes>
    </BrowserRouter>
  )
}