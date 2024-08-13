import React from "react";
import "./ListFlowers.css";
import { url } from "../App";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import EditFlower from "./EditFlower";

const ListFlowers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const fetchFlower = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${url}/api/flower/list`);
      if (response.data.success) {
        setData(response.data.flowers);
      }
    } catch (error) {
      toast.error("Error Occured");
    }
    setLoading(false)
  };
  const removeFlower = async (id) => {
    setLoading(true)
    try {
      const response = await axios.post(`${url}/api/flower/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Error Occured");
    }
    updateApi()
  };
  const updateApi = async () => {    
    await fetchFlower()
  }
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
            <EditFlower item={item} key={index} removeFlower={removeFlower} updateApi={updateApi} setLoading={setLoading}/>
            
          ))
        :
        <div className="loading"> Loading.....</div>
        }
      </div>
    </div>
  );
};

export default ListFlowers;
