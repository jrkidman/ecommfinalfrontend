import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './Pages/HomePage';
import NavBar from './Components/NavBar';
import RegistrationPage from './Pages/RegistrationPage';
import LoginPage from './Pages/LoginPage';
import ProductPage from './Pages/ProductPage';
import Cart from './Pages/Cart';


function App() {
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const [currentCart, setCurrentCart] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);


  return (
    <div className="App">
      <header className="App-header">
        <Routes>

          <Route index element={<HomePage />} />

          <Route path="/" element={<NavBar />} />

          <Route path="login" element={<LoginPage
            isAuthLoading={isAuthLoading}
            setIsAuthLoading={setIsAuthLoading}
          />} />

          <Route path="registration" element={<RegistrationPage
            isAuthLoading={isAuthLoading}
            setIsAuthLoading={setIsAuthLoading}
          />} />

          <Route path="products" element={<ProductPage
            isAuthLoading={isAuthLoading}
            setIsAuthLoading={setIsAuthLoading}
          />} >

            {/* nested route for all products displaying */}
            <Route path="/all" element={<ProductPage
            />} />

            {/* nested route for single product */}
            <Route path="/product:id" element={<ProductPage
            />} />

          </Route>

          <Route path="admin" element={<Admin
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
          />} />

          <Route path="cart" element={<Cart
            currentCart={currentCart}
            setCurrentCart={setCurrentCart}
          />} />


        </Routes>
      </header>
    </div>
  );
}

export default App;
