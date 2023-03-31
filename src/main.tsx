import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import HomePage from './pages/home_page'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login_page';
import NotFoundPage from './pages/not_found'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <BrowserRouter>
      <div className="z-[-1] w-full h-full fixed bg-opacity-10 bg-contain backdrop-blur-[100px]"/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
