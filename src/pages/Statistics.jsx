import React, { useContext, useState } from 'react'
import { AdminContext } from '../components/context/AdminContextProvider'
import { orderTotal } from '../functions/products'

export default function Statistics() {
    const [orderProductTotals, setOrderProductTotals] = useState([])
    const [topTotal, setTopTotal] = useState('')
    const [topId, setTopId] = useState('')
    const [top, setTop] = useState(false)  
    const { fetchFlower, fetchOrders, flowers, orders, loading } = useContext(AdminContext) 
    
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
                    {/* <img src={flowers[topId].images[0].link} className="top__sold--image" alt="" /> */}
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
}
