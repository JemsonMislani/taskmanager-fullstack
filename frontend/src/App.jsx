import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Home'
import EditTask from './EditTask'
import CompletedTask from './CompletedTask'
export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/edit/:id' element={<EditTask />}/>
        <Route path='/completed' element={<CompletedTask />}/>
      </Routes>
    </BrowserRouter>
  )
}