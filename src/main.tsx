import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home_page'
import SigninPage from './pages/signin_page';
import NotFoundPage from './pages/not_found'
import TrackingPage from './pages/track_page'
import SignupPage from './pages/signup_page'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <BrowserRouter>
      <div className="z-[-1] w-full h-full fixed bg-opacity-10 bg-contain backdrop-blur-[100px]"/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signin' element={<SigninPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/track' element={<TrackingPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
