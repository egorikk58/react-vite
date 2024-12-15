import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Input} from './components/ui/input.tsx'

import Register from './components/auth/register.tsx'
import Login from './components/auth/login.tsx'
import {BrowserRouter} from "react-router-dom";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
)
