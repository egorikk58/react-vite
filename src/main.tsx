import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Register from './components/auth/register.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Register/>
  </StrictMode>,
)
