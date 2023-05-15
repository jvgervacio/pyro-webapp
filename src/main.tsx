import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home_page'
import SigninPage from './pages/signin_page';
import NotFoundPage from './pages/notfound_page'
import TrackingPage from './pages/track_page'
import SignupPage from './pages/signup_page'
import {initializeApp} from 'firebase/app';
import DashboardPage from './pages/dashboard_page'
import LayoutPage from './pages/layout_page';
import HistoryPage from './pages/history_page'
import SettingsPage from './pages/settings_page'


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <BrowserRouter>
        <div className="z-[-1] w-full h-full fixed bg-opacity-10 bg-contain backdrop-blur-[100px]"/> 
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signin' element={<SigninPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/track' element={<TrackingPage />} />
          <Route path='/dashboard' element={<DashboardPage/>} />
          <Route path='/layout' element={<LayoutPage/>} />
          <Route path='/history' element={<HistoryPage/>} />
          <Route path='/settings' element={<SettingsPage/>} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>

  </React.StrictMode>,
)
