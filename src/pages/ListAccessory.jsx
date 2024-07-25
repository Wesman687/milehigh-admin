import React from 'react'
import './ListAccessory.css'
import { url } from "../App";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const ListAccessory = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const fetchAccessory = async () => {
      try {
        const response = await axios.get(`${url}/api/accessory/list`);
        if (response.data.success) {
          setData(response.data.accessories);
          console.log(response);
        }
      } catch (error) {
        toast.error("Error Occured");
      }
    };
    const removeAccessory = async (id) => {
      setLoading(true)
      try {
        const response = await axios.post(`${url}/api/accessory/remove`, { id });
        if (response.data.success) {
          toast.success(response.data.message);
          await fetchAccessory();
        }
      } catch (error) {
        toast.error("Error Occured");
      }
      setLoading(false)
    };
    useEffect(() => {
      fetchAccessory();
    }, []);
    console.log(data);
    return (
      <div className="landing__container">
        <div className="flower__wrapper">
          <p className="flower__title">Accessory List</p>
          {((data) && !loading) ? 
            data.map((item, index) => (
              <div key={index} className="flowers">
                <div className="image__wrapper">
                  <img src={item.image} alt="" className="flower__image" />
                  <div className="info__wrapper">
                    <div className="flower__text">
                      <p className="flower__display">{item.name}</p>
                      <p className="flower__display">{item.title}</p>
                      <p className="flower__display">{item.tag}</p>
                      <p className="flower__display">{item.sizes}</p>
                      <p className="flower__display">{item.price}</p>
                    </div>
                    <button className="click remove__button" onClick={()=>removeAccessory(item._id)}>Remove</button>
                  </div>
                </div>
                <p className="flower__display flower__desc">{item.desc}</p>
              </div>
              
            ))
          :
          <div className="loading"> Loading.....</div>
          }
        </div>
      </div>
  )
}

export default ListAccessory
