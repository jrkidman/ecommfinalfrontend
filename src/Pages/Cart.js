import React from "react";

const Cart = ({
   products,
   user,
   currentCart,
   setCurrentCart
}) => {
   return <div
      className="cart-page">
      <h1>Your Cart</h1>
      {/* display: image, title, quantity/remove item, price per item/Price
          display:                    total items          total price
          display: checkout button */}

      <div>{currentCart.map((product) => {
         return
         <DisplayCartProduct
            product={product}
            key={product.productID} />
      })}
      </div>
   </div>
};

const DisplayCartProduct = ({ product, user, currentCart, setCurrentCart }) => {
   return (
      <div classname="single-cart-product">
         <img
            id="cart-image"
            src={product.image}
            title="source: imgur.com"
         />

         <p>
            <span>
               {product.title}
            </span>
         </p>

         <p>
            <span>
               Quantity: get quantity from currentCart
            </span>
         </p>

         <button
            id="removeItem"
            type="reset"
            onClick={async () => {
               //remove single item from currentCart array here
            }}
         >
            Remove Item
         </button>

         <p>
            <span>
               Price per item: {product.price}
            </span>
         </p>

         <p>
            <span>
               Total Price: need function to sum prices of products in currentCart
            </span>
         </p>

      </div>
   )
}



export default Cart;

/*
Cart functionality:
 - cart icon to display on navbar (stretch: have the number of items in cart badge displayed on icon).
    -numberOfItems
 - ability to add/edit/empty items in cart
    - when add to cart is clicked on a product, that product is pushed into the user's currentCart array
    -removeItem-function
    -emptyCart
 - cart calculates total
    -cartTotalPrice
 - cart displays:
    - product name, price, quantity, image
 - empty cart display page?
    -conditional? or state variable?
    -isEmpty boolean
 - stores each user's cart in db
    -should it be stored as a separate collection or in users.currentCart?
 - Once order is placed, how should we store orders?
    - in a separate collection
    - don't store user cart in db until checkout, save cart in state until checkout.
    -(stretch) save cart to local storage

- onClick add to cart function: 
    - stretch: add validation so user cannot add to cart unless logged in (alert: "Must be logged in to add item to cart")
    - adds product object to user's current cart (specifically to the user that is logged in.)
    -stretch: update badge on cart icon to display number of items in cart
 */
