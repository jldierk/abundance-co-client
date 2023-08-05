import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/home'
import Admin from './pages/admin'
import ProductView from './pages/product'
import { useEffect, useState } from 'react'

function App() {
  const BACKEND_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
  const [cart, setCart] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let uri = BACKEND_BASE_URL + "/api/v1/users"
    fetch(uri, {credentials: 'include'})
      .then(response => response.json())
      .then(json => {
          setUser(json)
          let uri = BACKEND_BASE_URL + "/api/v1/orders/cart"
          fetch(uri, {credentials: 'include'})
            .then(response => response.json())
            .then(json => setCart(json))
            .catch(error => console.error(error));
      })
      .catch(error => console.error(error)); 
  }, []);

  return (
    <body>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout user={user} cart={cart}/>}>
            <Route index element={<Home />} />
            <Route path="admin" element={<Admin />} />
            <Route path="product" element={<ProductView cart={cart} updateCart={setCart}/>} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </body>
  )
}

export default App
