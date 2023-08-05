import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/home'
import Admin from './pages/admin'
import ProductView from './pages/product'

function App() {
  return (
    <body>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="admin" element={<Admin />} />
            <Route path="product" element={<ProductView />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </body>
  )
}

export default App
