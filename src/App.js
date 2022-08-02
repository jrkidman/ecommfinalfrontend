import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProductPage from './Pages/ProductPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>

          <Route index element={<HomePage />} />

          <Route path="/" element={<NavBar />} />

          <Route path="login" element={<LoginPage
          // isAuthLoading={isAuthLoading}
          // setIsAuthLoading={setIsAuthLoading}
          />} />

          <Route path="registration" element={<RegistrationPage
          // isAuthLoading={isAuthLoading}
          // setIsAuthLoading={setIsAuthLoading}
          />} />

          <Route path="products" element={<ProductPage
          // isAuthLoading={isAuthLoading}
          // setIsAuthLoading={setIsAuthLoading}
          />} />

        </Routes>
      </header>
    </div>
  );
}

export default App;
