import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom'
import HomePage from 'views/home_page'
import SigninPage from 'views/signin_page';
import NotFoundPage from 'views/notfound_page'
import TrackingPage from 'views/track_page'
import SignupPage from 'views/signup_page'
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import DashboardPage from 'views/dashboard_page'
import LayoutPage from 'views/layout_page';
import HistoryPage from 'views/history_page'
import SettingsPage from 'views/settings_page'
import { Provider } from 'react-redux'
import store from 'store/store'

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
    <Provider store={store}>
      <BrowserRouter>
        <div className="z-[-1] w-full h-full fixed bg-opacity-10 bg-contain backdrop-blur-[100px]" />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signin' element={<SigninPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/track' element={<TrackingPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/layout' element={<LayoutPage />} />
          <Route path='/history' element={<HistoryPage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>

  </React.StrictMode>,
)
