import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../Hooks/Auth";
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

const Profile = () => {
  const { user } = useAuth();
  // Get orderHistory from user object
  const getUserOrderHistory = async () => {
    const url = `${urlEndpoint}/profile/user`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: user,
      },
    });
    const responseJSON = await response.json();
    return responseJSON;
  };

  // variable assigned to order data fetched from server, and converted to JSON
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const orderHistoryResponse = await getUserOrderHistory();
      setOrderHistory(orderHistoryResponse.currentUser.orderHistory);
      // setOrderJSON(apiJSON);
      return;
    };
    fetchData();
  }, []);

  return (
    <div className="profile-page">
      <div className="container">
        <h1>Order History</h1>

        <br />

        {/* function to map over order history and display separate orders */}
        <div>
          {orderHistory.map((order) => {
            return <DisplayOrderHistory order={order} />;
          })}
        </div>
      </div>
    </div>
  );
};

// Take in props to display user order history.
const DisplayOrderHistory = ({ order }) => {
  return (
    <div className="user-history">
      <strong>{order.orderId}</strong>
      <strong>{order.status}</strong>
      <ul>
        {order.productList.map((product) => {
          return <li>{product.title}</li>;
        })}
      </ul>
      <hr />
    </div>
  );
};
export default Profile;
