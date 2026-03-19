import { useState } from 'react'
import './App.css'
import ControlPanel from './components/ControlPanel'
import { Header } from './components/Header'

function App() {
  return (
    <>
      <Header />
      <ControlPanel />
    </>
  )
}

export default App