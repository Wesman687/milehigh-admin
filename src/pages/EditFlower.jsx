import React from "react";
import { useState } from "react";
import { localUrl, url } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import upload from "../assetts/upload_area.png";

const EditFlower = ({ item, removeFlower, updateApi, setLoading }) => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price1, setPrice1] = useState("");
  const [price2, setPrice2] = useState("");
  const [price3, setPrice3] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);

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

      setImages((oldImages) => {
        return [
          ...oldImages,
          { link: res.data.secure_url, public_id: res.data.public_id },
        ];
      });
    }
  }
  function removeItem(id) {
    removeFlower(id);
  }
  function removeImage(index, link) {
    setImages(images.filter((item) => item.link !== link))
  }
  async function onSubmitHandler(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const prices = [price1, price2, price3]
      const data = { id: item._id, name, desc, title, prices, images, category }
      const response = await axios.post(`${url || localUrl}/api/flower/update`, data);
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
  function updateImagesOrder(images) {
    setImages(images)
  }
  useEffect(() => {
    setName(item.name);
    setTitle(item.title);
    setDesc(item.desc);
    setPrice1(item.prices[0]);
    setPrice2(item.prices[1]);
    setPrice3(item.prices[2]);
    setCategory(item.category);
    setImage(item.image);
    setImages(item.images || []);
  }, []);
  return (
    <div className="flowers">
      <ReactSortable list={images} setList={updateImagesOrder} className="edit__image--array">
        {images.length > 0 &&
          images.map((item, index) => (
            <figure key={index} className="image__box">
              <p className="x" onClick={() => removeImage(index, item.link)} >
                X
              </p>
              <img src={item.link} className="flower__image x__image" alt="" />
            </figure>

          ))}
      </ReactSortable>
      <label className="upload__image--edit">
        <input
          type="file"
          name='file'
          onChange={(e) => uploadImage(e)}
          hidden
        />
        <img
          src={upload}
          className="upload__image"
          alt=""
        />
      </label>
      <div className="image__wrapper">
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
                onClick={(e) => onSubmitHandler(e)}
              >
                Update
              </button>
              
            </div>
            <div className="category__wrapper">
            <select
                defaultValue={category}
                className="pd__options"
                name=""
                id="size"
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value="">Choose Options</option>
                <option value="Flower">Flower</option>
                <option value="Resin/Crumble">Resin/Crumble</option>
              </select>
            <p className="category">{category}</p>
            </div>
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
