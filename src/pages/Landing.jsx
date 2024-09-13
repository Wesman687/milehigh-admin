import React, { useEffect, useState } from "react";
import "./Landing.css";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
import { getProductTotals, topProduct, tempTopId, tempTopTotal, orderTotal } from "../functions/products";

const Landing = () => {
  const [flowers, setFlowers] = useState([])
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState([])
  const [orderProductTotals, setOrderProductTotals] = useState([])
  const [topTotal, setTopTotal] = useState('')
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
    if (orders.length > 0) {
      getProductTotals(orders).then(productTotals => {
        setOrderProductTotals(productTotals)
        topProduct(productTotals)
        console.log(tempTopId, tempTopTotal)
        setTopId(tempTopId)
        setTopTotal(tempTopTotal)
        setTop(true)
      })
    }
    setLoading(false)
  };
  useEffect(() => {
    setLoading(true)
    fetchFlower()
    fetchOrders()
  }, [])
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
            <p>Total Ordered: ${orderTotal(orders)}</p>

          </div>

        </div>}
    </div>
  );
};

export default Landing;
