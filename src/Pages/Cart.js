import React from "react";

const Cart = () => {
  return <div>Cart goes here :)</div>;
};

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
 */
