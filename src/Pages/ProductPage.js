import React from "react";

const ProductPage = ({
  products,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
  filterField,
  setFilterField,
  filterValue,
  setFilterValue,
  limit,
  setLimit,
  page,
  setPage,
  currentCart,
  setCurrentCart,
  category,
}) => {
  return (
    <div className="products-page">
      <div className="container">
        <h1>Products Page</h1>
        <label>Sort By</label>
        &nbsp;
        <select
          value={sortField}
          onChange={(event) => {
            const newSortField = event.target.value;
            setSortField(newSortField);
          }}
        >
          <option value="title">Title</option>
          <option value="price">Price</option>
          <option value="category">Category</option>
          <option value="productId">ID</option>
        </select>
        <br />
        <label>Order</label>
        &nbsp;
        <select
          value={sortOrder}
          onChange={(event) => {
            const newSortOrder = event.target.value;
            setSortOrder(newSortOrder);
          }}
        >
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
        <br />
        {/* <label>Filter By</label>
            &nbsp;
            <select
                value={filterField}
                onChange={(event) => {
                    const newFilterField = event.target.value;
                    setFilterField(newFilterField);
                }}
            >
                <option value="category">Category</option>
            </select>
            <br /> */}
        <label>Category: </label>
        <select
          value={filterValue}
          // placeholder="cake, pie, booze infused, cookies, edibles (21+)"

          onChange={(event) => {
            const newFilterValue = event.target.value;
            setFilterValue(newFilterValue);
          }}
        >
          {category.map((cat) => {
            return <option value={cat}>{cat}</option>;
            console.log("cat: ", cat);
          })}
        </select>
        <label>Products Per Page</label>
        <input
          type="number"
          min="1"
          value={limit}
          placeholder="What is your limit, Daddy?"
          onChange={(event) => {
            const newLimit = event.target.value;
            setLimit(newLimit);
          }}
        ></input>
        <label>Page</label>
        <input
          type="number"
          min="1"
          value={page}
          placeholder="Page"
          onChange={(event) => {
            const newPage = event.target.value;
            setPage(newPage);
          }}
        ></input>
        <div>
          {products.map((product) => {
            return (
              <DisplayProduct
                currentCart={currentCart}
                setCurrentCart={setCurrentCart}
                product={product}
                key={product.productId}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const DisplayProduct = ({ product, currentCart, setCurrentCart }) => {
  return (
    <div className="single-product">
      {/* <img referrerPolicy="no-referrer" src={product.image} /> */}
      <img
        id="image"
        alt="some noms"
        src={product.image}
        title="source: imgur.com"
      />

      <p>
        <span>
          <strong> Title: </strong>
          <br />
        </span>
        {product.title}
      </p>
      <p>
        <span>
          <strong>Category: </strong> <br />
        </span>
        {product.category}
      </p>
      <p>
        <span>
          <strong>Price: </strong> <br />
        </span>
        ${product.price}.00
      </p>
      <p>
        <span>
          <strong>Description </strong> <br />
        </span>
        {product.description}
      </p>
      {/* <p>
                <span>
                    <strong>ID: </strong> <br />
                </span>
                {product.productId}
            </p> */}
      <button
        id="addToCart"
        type="submit"
        onClick={() => {
          console.log("current cart", currentCart);
          const updatedCart = [...currentCart];
          //check for existing product in cart to set quantity

          const addToCart = (product) => {
            console.log("product ", product);
            const checkId = updatedCart.findIndex(
              (cartProduct) => cartProduct.productId === product.productId
            );
            if (checkId !== -1) {
              updatedCart[checkId].quantity++;
              console.log("Quantity updated:", updatedCart);
            } else {
              product.quantity = 1;
              updatedCart.push(product);
              console.log("Product added to cart:", updatedCart);
            }
            setCurrentCart(updatedCart);
          };
          addToCart(product);
        }}
      >
        Add to Cart
      </button>
      <br />
      <hr></hr>
    </div>
  );
};

export default ProductPage;
