import axios from "axios";
import React from "react";
import "./ListOrders.css";
import { useEffect } from "react";
import { useState } from "react";
import { localUrl, url } from "../App";

const ListOrders = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const totalPrice = (data) => {
    let counter = 0
    data.forEach(item =>{
      counter += item.quantity * item.basePrice
    })
    return counter
  }
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/orders/list`);
      if (response.data.success) {
        setData(response.data.orders);
      }
    } catch (error) {
      alert("Error Occured");
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="landing__container">
        
        <div className="orders__wrapper">
      {loading ? (
        <>
          <h1>Loading....</h1>
        </>
      ) : (
        <>
            {data.length > 0 && data.map((data, index) => (
                <>
                
            <div className="orders__info">
                <p className="order__text">{data.createdAt.slice(0,10)}</p>
                <p className="order__text">${totalPrice(data.products)}</p>
                <p className="order__text">{data.paymentStatus}</p>
                </div>;
                </>
            ))}
          
        </>
      )}
      </div>
    </div>
  );
};

export default ListOrders;
