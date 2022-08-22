import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./Pages/HomePage";
import NavBar from "./Components/NavBar";
import RegistrationPage from "./Pages/RegistrationPage";
import LoginPage from "./Pages/LoginPage";
import ProductPage from "./Pages/ProductPage";
import Cart from "./Pages/Cart";
import Admin from "./Pages/Admin";
import Profile from "./Pages/Profile";
import { useEffect } from "react";
import { async } from "q";

const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

function App() {
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [currentCart, setCurrentCart] = useState([]);

  // variable to determine if logged in user is an admin
  const [isAdmin, setIsAdmin] = useState(false);

  // variable assigned to product data fetched from server, and converted to JSON
  const [serverJSON, setServerJSON] = useState({ message: [] });

  const [sortField, setSortField] = useState("productId");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [filterField, setFilterField] = useState("title");
  const [filterValue, setFilterValue] = useState("");
  const [limit, setLimit] = useState(Number());
  const [page, setPage] = useState(Number(1));
  const [isFetching, setIsFetching] = useState(false);

  const getProductForCart = async (product) => {
    const url = urlEndpoint + "/cart";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const responseJSON = await response.json();
    return responseJSON;
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = `${urlEndpoint}/products/all?sortField=${sortField}&sortOrder=${sortOrder}&filterField=${filterField}&filterValue=${filterValue}&limit=${limit}&page=${page}`;
      const apiResponse = await fetch(url);
      const apiJSON = await apiResponse.json();
      setServerJSON(apiJSON);
      return;
    };
    fetchData();
  }, [sortField, sortOrder, filterField, filterValue, limit, page, isFetching]);

  return (
    <div className="App">
      {/* <body id="home-page"> */}
      <header id="home-page" className="App-header">
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<HomePage />} />
            <Route
              path="login"
              element={
                <LoginPage
                  isAdmin={isAdmin}
                  setIsAdmin={setIsAdmin}
                  isAuthLoading={isAuthLoading}
                  setIsAuthLoading={setIsAuthLoading}
                  currentCart={currentCart}
                  setCurrentCart={setCurrentCart}
                />
              }
            />

            <Route
              path="registration"
              element={
                <RegistrationPage
                  isAdmin={isAdmin}
                  setIsAdmin={setIsAdmin}
                  isAuthLoading={isAuthLoading}
                  setIsAuthLoading={setIsAuthLoading}
                />
              }
            />

            <Route
              path="products"
              element={
                <ProductPage
                  products={serverJSON.message}
                  currentCart={currentCart}
                  setCurrentCart={setCurrentCart}
                  isAuthLoading={isAuthLoading}
                  setIsAuthLoading={setIsAuthLoading}
                  sortField={sortField}
                  setSortField={setSortField}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                  filterField={filterField}
                  setFilterField={setFilterField}
                  filterValue={filterValue}
                  setFilterValue={setFilterValue}
                  limit={limit}
                  setLimit={setLimit}
                  page={page}
                  setPage={setPage}
                />
              }
            >
              {/* nested route for all products displaying */}
              <Route path="all" element={<ProductPage />} />

              {/* nested route for single product */}
              <Route path="/products/:productId" element={<ProductPage />} />
            </Route>

            <Route
              path="admin"
              element={<Admin isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}
            />

            <Route path="profile" element={<Profile />} />

            <Route
              path="cart"
              element={
                <Cart
                  getProductForCart={getProductForCart}
                  currentCart={currentCart}
                  setCurrentCart={setCurrentCart}
                />
              }
            />
          </Route>
        </Routes>
      </header>
      {/* </body> */}
    </div>
  );
}

export default App;
