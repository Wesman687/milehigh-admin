import React, { useState } from "react";
import "./AddFlower.css";
import { url } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import upload from "../assetts/upload_area.png";

const AddFlower = () => {
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price1, setPrice1] = useState("");
  const [price2, setPrice2] = useState("")
  const [price3, setPrice3] = useState("")
  const [category, setCategory] = useState("")
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState("")
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("title", title);
      formData.append("prices", price1)
      formData.append("prices", price2)
      formData.append("prices", price3)
      formData.append("image", image);
      formData.append("price", "160")
      formData.append("category", category)
      const response = await axios.post(`${url}/api/flower/add`, formData);
      if (response.data.success) {
        toast.success("Flower Added");
        setName("");
        setDesc("");
        setTitle("");
        setPrice1("");
        setPrice2("")
        setPrice3("")
        setImage(false);
      } else {
        toast.error("Something went Wrong");
      }
    } catch (error) {
      toast.error("Error Occured");
    }
    setLoading(false);
  };
  return (
    <div className="landing__container">
      {loading ? <div className="loading">Loading....</div> : <><div className="page__wrapper">
        <form onSubmit={onSubmitHandler} className="page__handler">
          <div className="page__forms">
            <div className="page__upload">
              <p>Upload Image:</p>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                id="image"
                accept="image/*"
                hidden
              />
              <label htmlFor="image">
                <img
                  src={image ? URL.createObjectURL(image) : upload}
                  className="upload__image"
                  alt=""
                />
              </label>
              <p>Category:</p>
              <option value=""></option>
              <select
                      defaultValue=""
                      className="pd__options"
                      name=""
                      id="size"
                      onChange={(event) => setCategory(event.target.value)}
                    >
                      <option value="">Choose Options</option>
                      <option value="Flower" data-default>
                        Flower
                      </option>
                      <option value="Flower" data-default>
                        Resin/Crumble
                      </option>
                    </select>
            </div>
          </div>
          <div className="page__list">
            <div className="name list">
              <p>Name:</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="form__inputs"
                placeholder="Insert Name here"
                type="text"
              ></input>
            </div>
            <div className="tite list">
                
              <p className="title__text">Title:</p>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="form__inputs"
                placeholder="Insert Title"
                type="text"
              ></input>
            </div>
            <div className="price list">
                
              <p className="price__text">Prices:</p>
              <p className="price__categories">Quarter</p>
              <input
                onChange={(e) => setPrice1(e.target.value)}
                value={price1}
                className="form__inputs price_input"
                placeholder="ex: 30.00"
                type="number"
              ></input>
              <p className="price__categories">Half</p>
              <input
                onChange={(e) => setPrice2(e.target.value)}
                value={price2}
                className="form__inputs price_input"
                placeholder="ex: 9.00"
                type="number"
              ></input>
              <p className="price__categories">Ounce</p>
              <input
                onChange={(e) => setPrice3(e.target.value)}
                value={price3}
                className="form__inputs price_input"
                placeholder="ex: 160.00"
                type="number"
              ></input>
            </div>
            <div className="description list">

              <p className="desc__text">Desc:</p>
              <textarea
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                className="desc__input"
                placeholder="Insert Description here"
                type="text"
              ></textarea>
            </div>
          </div>
          <button className="submit__button click" type="submit">ADD</button>
        </form>
      </div></>}
    </div>
  );
};

export default AddFlower;
