import axios from "axios";
import React from "react";
import "./ListOrders.css";
import { useEffect } from "react";
import { useState } from "react";
import { localUrl, url } from "../App";
import { useNavigate } from "react-router-dom";
const ListOrders = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [displayedOrders, setDisplayedOrders] = useState([])
  const navigate = useNavigate()
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
    console.log(data)
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
                
            <div key={index} className="orders__info" onClick={()=>navigate(`/orders/${data._id}`)}>
                <p className="order__text">{data.createdAt.slice(0,10)}</p>
                <p className="order__text">${data.totalPrice}</p>
                <p className="order__text">Payment Status: {data.paymentStatus}</p>
                <p className="order__text" >{data.email}</p>
                
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
