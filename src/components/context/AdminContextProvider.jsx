import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { url } from '../../App';
import { toast } from 'react-toastify';
import { getProductTotals, mostPopularSize, topProduct } from '../../functions/products';

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    const [flowers, setFlower] = useState([])
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [orderProductTotals, setOrderProductTotals] = useState([])
    const [topTotal, setTopTotal] = useState('')
    const [topId, setTopId] = useState('')
    const [topIdOption, setTopIdOption] = useState('')
    const [top, setTop] = useState(false)  
    const [topSize, setTopSize] = useState('')
    const [topSizeAmount, setTopSizeAmount] = useState('')

    const fetchFlower = async () => {
      setLoading(true)
        try {
          const response = await axios.get(`${url}/api/flower/list`);
          if (response.data.success) {
            setFlower(response.data.flowers);
          }
        } catch (error) {
          toast.error("Error Occured");
        }
        setLoading(false)
      };
    
     const fetchOrders = async () => {
      setLoading(true)
        try {
          const response = await axios.get(`${url}/api/orders/list`);
          if (response.data.success) {
            setOrders(response.data.orders);
          }
        } catch (error) {
          toast.error("Error Occured");
        }
        setLoading(false)
        
      };
      const getTotals = async () => {       
        let res 
        await fetchOrders()
        const productTotals = await getProductTotals(orders)
        setOrderProductTotals(productTotals)
        res = await topProduct(productTotals)
        setTopId(res.topId)
        setTopTotal(res.topTotal)
        setTopIdOption(res.size)
        if (res.topId){
          setTop(true)
        }
        res = await mostPopularSize(productTotals)
        setTopSize(res.size)
        setTopSizeAmount(res.total)
      }
      useEffect(()=> {
        fetchFlower()
        fetchOrders()
      },[])
    const contextValue = {
        fetchFlower, fetchOrders, flowers, orders, loading, orderProductTotals, topId, topTotal, top, getTotals, topIdOption,
        topSize, topSizeAmount,

    }


  return (
    <AdminContext.Provider value={contextValue}>{props.children}</AdminContext.Provider>
  )
}

export default AdminContextProvider