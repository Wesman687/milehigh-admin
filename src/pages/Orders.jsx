import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { localUrl, url } from "../App";
import { useEffect } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import { AdminContext } from "../components/context/AdminContextProvider";
const Orders = () => {
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);
  const { flowers } = useContext(AdminContext)
  let id = useParams();
  id = id.index;
  const navigate = useNavigate()
  const createOrderInShipStation = async () => {
    await getOrderNumber();
    setLoading(true);
    try {
      const fullName = order.firstName + " " + order.lastName;
      const shippingMethod = "standard";
      const carrierCode = "stamps_com";
      const serviceCode = "usps_first_class_mail";
      const packageCode = "package";
      // Construct the order payload
      const orderPayload = {
        orderNumber: orderNumber,
        orderDate: new Date().toISOString().split("T")[0],
        orderStatus: "awaiting_shipment",
        customerEmail: order.email,
        customerUsername: order.firstName,
        customerNotes: "Please ship as soon as possible!",
        internalNotes: "Customer called and would like to upgrade shipping",
        shipTo: {
          name: fullName,
          street1: order.address,
          street2: "",
          city: order.city,
          state: order.state,
          postalCode: order.zip,
          country: "US",
          phone: order.phone,
        },
        billTo: {
          name: fullName,
          street1: order.address,
          street2: "",
          city: order.city,
          state: order.state,
          postalCode: order.zip,
          country: "US",
          phone: order.phone,
        },
        items: order.products.map((item) => ({
          sku: item.id,
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.price,
        })),
        requestedShippingService: shippingMethod,
        carrierCode,
        serviceCode,
        packageCode,
        advancedOptions: {
          warehouseId: 149753,
        },
      };
      console.log("Order Payload:", JSON.stringify(orderPayload, null, 2));

      const response = await fetch(
        "https://ssapi.shipstation.com/orders/createorder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Basic " +
              btoa(
                "dd72555151634019bccbc5f753b8204d:798ebeaa436a4e278b752b1781e2ab2a"
              ), // Replace with your actual API key and secret
          },
          body: JSON.stringify(orderPayload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text(); // Get the response text for debugging
        console.error("Error creating order:", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          body: errorText,
        });
        return;
      }

      const result = await response.json();
      console.log("Order created successfully:", result);
      updateOrder(result.orderId, orderPayload.orderNumber, order._id);
      updateNumber();
    } catch (error) {
      console.error("Unexpected error:", error);
    }
    setLoading(false);
  };
  const getOrderNumber = async () => {
    try {
      const response = await axios.get(`${url}/api/orders/ordernumber`);
      setOrderNumber(response.data.number[0].orderNumber);
    } catch (error) {
      console.log(error);
    }
  };
  const updateNumber = async () => {
    try {
      const response = await axios.post(`${url}/api/orders/updatenumber`, {
        id: order._id,
      });
      console.log("update Number launched");
    } catch (error) {
      console.log(error);
    }
  };
  const updateOrder = async (orderId, orderNumber) => {
    const updatePayload = {
      id: order._id,
      orderId: orderId,
      orderNumber: orderNumber,
    };
    try {
      console.log(updatePayload);
      const response = await axios.post(
        `${url}/api/orders/updateorderid`,
        updatePayload
      );
      if (response.data.success) {
        alert("Order Updated");
      } else {
        alert("Something went Wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removeOrder = async (e) => {
    e.preventDefault()
      setLoading(true)
      try {
        const response = await axios.post(`${localUrl}/api/orders/remove`,  {id: order._id} );
        if (response.data.success) {
          toast.success(response.data.message);
        }
      } catch (error) {
        toast.error("Error Occured");
      }
      setLoading(false)
      navigate('/listorders')
    
  }
  const fetchOrder = async () => {
    try {
      const response = await axios.get(`${url}/api/orders/list`);
      if (response.data.success) {
        setOrder(response.data.orders.filter((order)=> order._id === id)[0]);
      }
    } catch (error) {
      alert("Error Occured");
    }
  };
  console.log(order)
  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <div className="landing__container">
      {loading ? (
        <>
          <p>Loading...</p>
        </>
      ) : (
        <>
          {order && (
            <div className="orders__container">
              <div className="shipping__wrapper">
                <div className="order__shipping">
                  <h1 className="payment__status">
                    Payment Status: {order.paymentStatus}
                  </h1>
                  <h1 className="payment__status">
                    Ship Status: {order.shippingState}
                  </h1>
                </div>
                {order.shippingState === "Not Shipped" ? (
                  <button
                    onClick={(e) => createOrderInShipStation(e)}
                    className="ship__button"
                  >
                    Ship Product
                  </button>
                ) : (
                  <button
                    onClick={(e) => createOrderInShipStation(e)}
                    className="ship__button--disable"
                  >
                    Ship Product
                  </button>
                )}
                <button className="order__remove ship__button" onClick={(e)=>removeOrder(e)}>Remove Order</button>
              </div>
              <div className="order__item">
                <b>Name</b>
                <b>Size</b>
                <b>Quantity</b>
                <b>Price</b>
                <b>Total</b>
              </div>
              <div className="orders__list">
                {order.products.map((data, index) => (
                  <div key={index} className="order__item">
                    <b>{data.name}</b>
                    <b>{data.option}</b>
                    <b>{data.quantity}</b>
                    <b>${data.price}</b>
                    <b>${data.price * data.quantity}</b>
                  </div>
                ))}
              </div>
              <div className="order__date">
                <b>Created: {(new Date(order.createdAt).toLocaleString())}</b>
                <b>Sub Total: ${order.totalPrice.toFixed(2)}</b>
              </div>
              <div className="customer__info">
                <div className="order__firstline">
                  <p>
                    {order.firstName} {order.lastName}
                  </p>
                  <Link to={`/customers/` + order.email}><p className="order__email--link">{order.email}</p></Link>
                </div>
                <div className="order__secondline">
                  <p>{order.address}</p>
                  <p>{order.city}</p>
                  <p>{order.state}</p>
                  <p>{order.zip}</p>
                </div>
                <p>{order.phone}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
