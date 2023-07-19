import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom'
import { Provider } from 'react-redux'

import "@styles/index.scss"

import store from '@store/store'

import HomePage from '@views/home_page'
import SigninPage from '@views/signin_page'
import NotFoundPage from '@views/notfound_page'
import TrackingPage from '@views/track_page'
import SignupPage from '@views/signup_page'
import DashboardPage from '@views/dashboard_page'
import LayoutPage from '@views/layout_page';
import HistoryPage from '@views/history_page'
import SettingsPage from '@views/settings_page'
import AboutUsPage from './views/aboutus_page'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signin' element={<SigninPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/track' element={<TrackingPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/layout' element={<LayoutPage />} />
          <Route path='/history' element={<HistoryPage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/about' element={<AboutUsPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>

  </React.StrictMode>,
)
