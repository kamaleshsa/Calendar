import App from './App.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { NextUIProvider } from '@nextui-org/react'

import './index.scss'

const Main = () => {
  return (
    <React.StrictMode>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </React.StrictMode>
  )
}

export default Main

ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
