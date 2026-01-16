import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/Button'
import { PlusIcon } from './icons/PlusIcon'

function App() {

  return (
    <>
    <Button startIcon={<PlusIcon/>} variant="primary" text="share" size='sm'></Button>
    <Button variant="secondary" text="Add Content" size='md'></Button>

    </>
  )
}

export default App
