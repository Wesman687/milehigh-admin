import React from "react";
import { useState } from "react";
import { url } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

const EditFlower = ({ item, removeFlower, updateApi }) => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price1, setPrice1] = useState("");
  const [price2, setPrice2] = useState("");
  const [price3, setPrice3] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState("loading");
  console.log(category)
  function removeItem(id) {
    removeFlower(id);
  }
  async function updateItem(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", item._id)
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("title", title);
      formData.append("prices", price1);
      formData.append("prices", price2);
      formData.append("prices", price3);
      formData.append("price", "160");
      formData.append("category", category);
      const response = await axios.post(`${url}/api/flower/update`, formData);
      if (response.data.success) {
        toast.success("Flower Added");
      } else {
        toast.error("Something went Wrong");
      }
    } catch (error) {
      toast.error("Error Occured");
    }
    setLoading(false);
    updateApi();
  }
  useEffect(() => {
    setName(item.name);
    setTitle(item.title);
    setDesc(item.desc);
    setPrice1(item.prices[0]);
    setPrice2(item.prices[1]);
    setPrice3(item.prices[2]);
    setCategory(item.category);
    setImage(item.image)
  }, []);
  return (
    <div className="flowers">
      <div className="image__wrapper">
        <img src={item.image} alt="" className="flower__image" />
        <div className="info__wrapper">
          <div className="flower__text">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="update__input"
              placeholder="Insert Name here"
              type="text"
            ></input>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="update__input"
              placeholder="Title"
              type="text"
            ></input>
            <div className="number__container">
              <input
                onChange={(e) => setPrice1(e.target.value)}
                value={price1 ? price1 : ""}
                className="update__input number__input"
                placeholder="20"
                type="number"
              ></input>
              <input
                onChange={(e) => setPrice2(e.target.value)}
                value={price2 ? price2 : ""}
                className="update__input number__input"
                placeholder="100"
                type="number"
              ></input>
              <input
                onChange={(e) => setPrice3(e.target.value)}
                value={price3 ? price3 : ""}
                className="update__input number__input"
                placeholder="220"
                type="number"
              ></input>
            </div>
            {item.tag && <p className="flower__display">{item.tag}</p>}
          </div>
          <div className="right__container">
          <div className="button__container">
            <button
              className="click remove__button"
              onClick={() => removeItem(item._id)}
            >
              Remove
            </button>
            <button
              className="click remove__button"
              onClick={(e) => updateItem(e)}
            >
              Update
            </button>
            <select
                      defaultValue={category}
                      className="pd__options"
                      name=""
                      id="size"
                      onChange={(event) => setCategory(event.target.value)}
                    >
                      <option value="">Choose Options</option>
                      <option value="Flower">
                        Flower
                      </option>
                      <option value="Resin/Crumble">
                        Resin/Crumble
                      </option>
                    </select>
            
          </div>
          <p className="category">{category}</p>
          </div>
        </div>

      </div>
      <textarea
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
        className="update__text"
        placeholder="Insert Description here"
        type="text"
      ></textarea>
    </div>
  );
};

export default EditFlower;
