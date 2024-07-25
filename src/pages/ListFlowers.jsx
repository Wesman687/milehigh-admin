import React from "react";
import "./ListFlowers.css";
import { url } from "../App";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const ListFlowers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const fetchFlower = async () => {
    try {
      const response = await axios.get(`${url}/api/flower/list`);
      if (response.data.success) {
        setData(response.data.flowers);
        console.log(response.data);
      }
    } catch (error) {
      toast.error("Error Occured");
    }
  };
  const removeFlower = async (id) => {
    setLoading(true)
    try {
      const response = await axios.post(`${url}/api/flower/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchFlower();
      }
    } catch (error) {
      toast.error("Error Occured");
    }
    setLoading(false)
  };
  useEffect(() => {
    fetchFlower();
  }, []);
  console.log(data);
  return (
    <div className="landing__container">
      <div className="flower__wrapper">
        <p className="flower__title">Flower List</p>
        {((data.length > 0) && !loading) ? 
          data.map((item, index) => (
            <div key={index} className="flowers">
              <div className="image__wrapper">
                <img src={item.image} alt="" className="flower__image" />
                <div className="info__wrapper">
                  <div className="flower__text">
                    <p className="flower__display">{item.name}</p>
                    <p className="flower__display">{item.title}</p>
                    <p className="flower__display">{item.price}</p>
                  </div>
                  <button className="click remove__button" onClick={()=>removeFlower(item._id)}>Remove</button>
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
  );
};

export default ListFlowers;
