import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/Button'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/Share'

function App() {

  return (
    <>
    <Button startIcon={<PlusIcon size='md'/>} variant="primary" text="share" size='sm'></Button>
    <Button startIcon={<ShareIcon size='md'/>} variant="secondary" text="Add Content" size='md'></Button>

    </>
  )
}

export default App


