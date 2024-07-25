import React, { useState } from 'react'
import './AddAccessory.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { url } from '../App';
import upload from "../assetts/upload_area.png";


const AddAccessory = () => {
    const [image, setImage] = useState(false);
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [tag, setTag] = useState("")
    const [sizes, setSizes] = useState("")
    const [loading, setLoading] = useState(false);
  
    const onSubmitHandler = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("desc", desc);
        formData.append("title", title);
        formData.append("price", price);
        formData.append("tag", tag)
        formData.append("sizes", sizes)
        formData.append("image", image);
  
        const response = await axios.post(`${url}/api/accessory/add`, formData);
        if (response.data.success) {
          toast.success("Accessory Added");
          setName("");
          setDesc("");
          setTitle("");
          setPrice("");
          setSizes("")
          setTag("")
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
                  
                <p className="price__text">Price:</p>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  className="form__inputs"
                  placeholder="Insert Price here Numbers only, ie 180"
                  type="text"
                ></input>
              </div>
              <div className="tag list">
                  
                <p className="tag__text">tag:</p>
                <input
                  onChange={(e) => setTag(e.target.value)}
                  value={tag}
                  className="form__inputs"
                  placeholder="Insert tag here Numbers only, ie 180"
                  type="text"
                ></input>
              </div>
              <div className="sizes list">
                  
                <p className="sizes__text">sizes:</p>
                <input
                  onChange={(e) => setSizes(e.target.value)}
                  value={sizes}
                  className="form__inputs"
                  placeholder="Insert Sizes here Numbers only, ie 180"
                  type="text"
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
  )
}

export default AddAccessory


