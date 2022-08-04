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
}) => {
  return (
    <div className="products-page">
      <h1>Products Page</h1>
      <label>Sort Field</label>
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
      <label>Sort Order</label>
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
      <label>Filter Field</label>
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
      <br />
      <label>Filter Value: </label>
      <input
        type="text"
        value={filterValue}
        onChange={(event) => {
          const newFilterValue = event.target.value;
          setFilterValue(newFilterValue);
        }}
      ></input>
      <label>Limit</label>
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
          return <DisplayProduct product={product} key={product.productId} />;
        })}
      </div>
    </div>
  );
};

const DisplayProduct = ({ product }) => {
  return (
    <div className="single-product">
      {/* <img referrerPolicy="no-referrer" src={product.image} /> */}
      <img
        id="image"
        src="https://i.imgur.com/3N7J0Zn.jpg"
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
        {product.price}
      </p>
      <p>
        <span>
          <strong>Description </strong> <br />
        </span>
        {product.description}
      </p>
      <p>
        <span>
          <strong>ID: </strong> <br />
        </span>
        {product.productId}
      </p>
      <hr></hr>
    </div>
  );
};

export default ProductPage;
