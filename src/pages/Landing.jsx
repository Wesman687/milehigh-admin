

import React, { useContext, useEffect, useState } from 'react'
import { orderTotal } from '../functions/products'
import { AdminContext } from '../components/context/AdminContextProvider'
import './Landing.css'
import { Link, useNavigate } from 'react-router-dom'

function Landing() {

  const { fetchFlower, fetchOrders, flowers, orders, loading, orderProductTotals, getTotals, topId, topTotal, top, topIdOption, topSize, topSizeAmount,
    topCustomerOrders,
  } = useContext(AdminContext)
  const navigate = useNavigate()
  useEffect(() => {
    getTotals()
  }, [])
  return (
    <div className="landing__container">
      {(loading) ? <div>Loading .......</div>
        :
        <div className="statisics__wrapper">
          <div className="products__row">
            <h2>Total Products: <span>{flowers.length}</span></h2>

            <div className="sold__container">
              <h2>Most Sold:</h2>
              {top &&
                <>
                  <img src={flowers[topId].images[0].link} className="top__sold--image" alt="" />
                  <p>{flowers[topId].name}</p>
                  <h2>Sold:</h2>
                  <p>{topTotal}</p>
                  <h2>Size: </h2>
                  <p>{topIdOption}</p>
                </>}
            </div>
            <div className="sold__container">
              <h2>Most Popular Size:</h2>
              <p>{topSize}</p>

              <h2>Sold:</h2>
              <p>{topSizeAmount}</p>
            </div>
          </div>

          <div className="orders__row">
            <h2>Total Orders: <span>{orders.length}</span></h2>
            <h2>Total Ordered: <span>${orderTotal(orders)}</span></h2>
          </div>
          <div className="orders__row">
            <h2>Top Customer:  <Link to={`/customers/` + topCustomerOrders.email}><span className='order__email--link'>{topCustomerOrders.email}</span></Link></h2>
            <h2>Orders: <span>{topCustomerOrders.total}</span></h2>
            <h2>Purchased: <span>${topCustomerOrders.totalPrice}</span></h2>

          </div>

        </div>}
    </div>
  );
}

export default Landing


