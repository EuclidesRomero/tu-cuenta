import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import MiComponente from './MiComponente.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route>
         <Route path='/:token' element={<MiComponente />} />
         <Route path='/' element={<MiComponente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
