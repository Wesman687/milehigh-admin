import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { AdminContext } from "../components/context/AdminContextProvider"
import './CustomerPage.css'



function CustomerPage() {
    const { index } = useParams()
    const { orders, flowers } = useContext(AdminContext)
    const [filteredOrders, setFilteredOrders] = useState([])
    const navigate = useNavigate()
    
    console.log(index, filteredOrders, flowers)
    useEffect(()=> {
        setFilteredOrders(orders.filter((order)=> order.email === index))
    },[])
  return (
    <div className="landing__container">
        {filteredOrders.length > 0 &&  
        <table>
            <thead>
            <tr>
                <td className="customer__header">Order</td>
                 <td className="customer__header">Created</td>
                 <td className="customer__header">Products</td>
                 <td className="customer__header">Total</td>
                 <td className="customer__header">Status</td>
            </tr>
            </thead>
            <tbody>
                {filteredOrders.length > 0 && filteredOrders.reverse().map(order=> (
            <tr onClick={()=>navigate('/orders/' + order._id)} key={order._id} className="tbody__customer">
                    <td className="tbody__td">{order.orderNumber}</td>
                <td className="tbody__td">{(new Date(order.createdAt).toLocaleString())}</td>
                <td>                
                {filteredOrders.length > 0 && order.products.map((product)=>(
                    <div key={product}>
                    {flowers[product.id].name} <br />
                    {product.option} x
                    {product.quantity} <br />
                    </div>
                ))}
                    </td>
                <td className="tbody__td">{`$${order.totalPrice.toFixed(2)}`}</td>
                <td className="tbody__td">{order.paymentStatus === 'complete' ? 'PAID' : 'PENDING'}</td>
            </tr>
                 ))}
            </tbody>
</table>}

    </div>
  )
}

export default CustomerPage