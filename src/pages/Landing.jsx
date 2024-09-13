import React, { useEffect, useState } from "react";
import "./Landing.css";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
const Landing = () => {
  const [flowers, setFlowers] = useState([])
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState([])
  const [orderProductTotals, setOrderProductTotals] = useState([])
  const [topTotal, setTopToal] = useState('')
  const [topId, setTopId] = useState('')
  const [top, setTop] = useState(false)
  const fetchFlower = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${url}/api/flower/list`);
      if (response.data.success) {
        setFlowers(response.data.flowers);
      }
    } catch (error) {
      toast.error("Error Occured");
    }
  };
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/orders/list`);
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      toast.error("Error Occured");
    }    
    getProductTotals()    
    setLoading(false)
  };
  const orderTotal = () => {
    let total = 0
    for (const order in orders){
      total += orders[order].totalPrice
    }
    return total
  }
  const getProductTotals = () => {
    if (flowers.length > 0 && orders.length > 0){
      let products = []
    for (const o in orders){
      for (const p of orders[o].products){
        let notExists = true
        let temp = { id: p.id, total: p.quantity}
        if (products.length > 0) {
          products.forEach((item) => {
            if (item.id === p.id) {
              notExists = false
              item.total += p.quantity
            }       
        })
        if (notExists) {
          products.push(temp)
        }
        }
        else {
          products.push(temp)
        }
      }
    }    
    setOrderProductTotals(products)
    topProduct()    
    }
    
  }
  const topProduct = () => {
    if (orderProductTotals.length > 0) {
      let topTotal = 0
      let topId
      orderProductTotals.forEach((item)=>{
        if (item.total > topTotal) {
          topTotal = item.total
          topId = item.id
        }
      })
      setTopId(topId)
      setTopToal(topTotal)    
      console.log(topTotal, topId, flowers, orders)
      setTop(true)
    }
  }
  useEffect(()=>{
    setLoading(true)
    fetchFlower()
    fetchOrders()
  },[])
  return (
    <div className="landing__container">
      {(loading && flowers.length > 0) ? <div>Loading .......</div>
      :
       <div className="statisics__wrapper">
          <h1>Statistics</h1>
          <div className="products__row"> 
          <h1>Products:</h1>
          <h2>Total Products: <span>{flowers.length}</span></h2>        

          <div className="sold__container">
          <h2>Most Sold:</h2>
          {top && 
          <>
          <img src={flowers[topId].images[0].link} className="top__sold--image" alt="" />
          <p>{flowers[topId].name}</p>
          <h2>Sold Amount:</h2>
          <p>{topTotal}</p>
          </>}
          
          </div>
          </div>
          
          <div className="orders__row"> 
          <h1>Orders:</h1>
          <p>Total Orders: {orders.length}</p>
          <p>Total Ordered: ${orderTotal()}</p>
          
          </div>

      </div>}
    </div>
  );
};

export default Landing;
