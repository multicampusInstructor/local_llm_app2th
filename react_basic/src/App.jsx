import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Test from './components/Header'
import Greeting from './components/Greeting'
import Counter from './components/Counter'
import InputState from './components/InputState'
import ListRending from './components/ListRending'
import UseEffectRender from './components/UseEffectRender'
import OllamaChat from './components/OllamaChat'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello React!</h1>
      <OllamaChat />
      <br />
      <ListRending />
      <UseEffectRender />
      <br />
      <InputState />
      <Test />
      <Greeting name="Leo"/>
      <Counter />
    </>
  )
}

export default App
