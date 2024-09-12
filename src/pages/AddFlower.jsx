import React, { useState } from "react";
import "./AddFlower.css";
import { localUrl, url } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import upload from "../assetts/upload_area.png";

const AddFlower = () => {
  const [image, setImage] = useState(false);
  const [imageArray, setImageArray] = useState([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price1, setPrice1] = useState("");
  const [price2, setPrice2] = useState("");
  const [price3, setPrice3] = useState("");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  async function uploadImage(e) {
    e.preventDefault();
    const files = e.target.files;
    const formData = new FormData();
    if (files?.length > 0) {
      for (const file of files) {
        formData.append("file", file);
      }
      formData.append("upload_preset", "ecommerce");
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dagmwaqcs/upload`,
        formData
      );

      setImageArray((oldImages) => {
        return [
          ...oldImages,
          { link: res.data.secure_url, public_id: res.data.public_id },
        ];
      });
    }
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const prices = [ price1, price2, price3 ]
      const data = { name, desc, title, prices, images: imageArray, category}
      const response = await axios.post(`${url}/api/flower/add`, data);
      if (response.data.success) {
        toast.success("Flower Added");
        setImageArray([])
        setName("");
        setDesc("");
        setTitle("");
        setPrice1("");
        setPrice2("");
        setPrice3("");
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
      {loading ? (
        <div className="loading">Loading....</div>
      ) : (
        <>
          <div className="page__wrapper">
            <form onSubmit={onSubmitHandler} className="page__handler">
              <div className="page__forms">
                <div className="page__upload">
                  <div className="category__wrapper">
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
                      <option value="Resin/Crumble" data-default>
                        Resin/Crumble
                      </option>
                    </select>
                  </div>
                  <div className="upload__images--container">
                    <p>Upload Images:</p>
                    {imageArray.length > 0 &&
                      imageArray.map((item, index) => (
                        <img key={index} src={item.link} className="upload__image--list" alt="" />
                      ))}
                    <input
                      type="file"
                      onChange={(e) => uploadImage(e)}
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    <label htmlFor="image">
                      <img
                        src={upload}
                        className="upload__image"
                        alt=""
                      />
                    </label>
                  </div>
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
                  <div className="price__individual">
                  <p className="price__text">Prices:</p>
                  <p className="price__categories">
                    {category === "Flower" ? "Quarter" : "2 grams"}
                  </p>
                  <input
                    onChange={(e) => setPrice1(e.target.value)}
                    value={price1}
                    className="form__inputs price_input"
                    placeholder="ex: 30.00"
                    type="number"
                  ></input>
                  </div>
                  <div className="price__individual">
                  <p className="price__categories">
                    {category === "Flower" ? "Half" : "10 grams"}
                  </p>
                  <input
                    onChange={(e) => setPrice2(e.target.value)}
                    value={price2}
                    className="form__inputs price_input"
                    placeholder="ex: 9.00"
                    type="number"
                  ></input>
                  </div>
                  <div className="price__individual">
                  <p className="price__categories">Ounce</p>
                  <input
                    onChange={(e) => setPrice3(e.target.value)}
                    value={price3}
                    className="form__inputs price_input"
                    placeholder="ex: 160.00"
                    type="number"
                  ></input>
                  </div>
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
              <button className="submit__button click" onClick={(e)=>onSubmitHandler(e)} type="submit">
                ADD
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default AddFlower;
