import React from "react";

const Profile = ({
  orders,
  wishes,
  orderHistory,
  setOrderHistory,
  wishlist,
  setWishlist,
}) => {
  return (
    <div className="profile-page">
      <h1>(Users Name) Profile</h1>

      {/* function to map over wishlists and display separate wishlists */}
      <div>
        {wishes.map((wish) => {
          return (
            <DisplayUserWishlist
              wish={wish}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          );
        })}
      </div>

      <br />

      {/* function to map over order history and display separate orders */}
      <div>
        {orders.map((order) => {
          return (
            <DisplayOrderHistory
              order={order}
              orderHistory={orderHistory}
              setOrderHistory={setOrderHistory}
            />
          );
        })}
      </div>
    </div>
  );
};

// Take in props to display user order history when button is clicked.
const DisplayOrderHistory = ({ order, orderHistory, setOrderHistory }) => {
  return (
    <div className="user-history">
      <button
        id="user-order-history"
        type="submit"
        onClick={async () => {
          console.log("Order History:", orderHistory);
          const updatedOrderHistory = [...orderHistory];
          updatedOrderHistory.push(order);
          setOrderHistory(updatedOrderHistory);
        }}
      >
        View Order History
      </button>
    </div>
  );
};

// Take in props to display user wishlists when button is clicked.
const DisplayUserWishlist = ({ wish, wishlist, setWishlist }) => {
  return (
    <div className="user-wishlist">
      <button
        id="displayWishlist"
        type="submit"
        onClick={async () => {
          console.log("Wishlist:", wishlist);
          const updatedWishlist = [...wishlist];
          updatedWishlist.push(wish);
          setWishlist(updatedWishlist);
        }}
      >
        View Wishlists
      </button>
    </div>
  );
};
export default Profile;
