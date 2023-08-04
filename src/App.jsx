import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import ProductForm from './components/ProductForm'
import ProductCard from './components/ProductCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <NavBar></NavBar>    
      <div style={{margin: "0% 10% 0% 10%"}}>
        <ProductForm></ProductForm>
        <ProductCard></ProductCard>
      </div>
    </div>
  )
}

export default App
