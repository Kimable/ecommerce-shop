import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = ({ url }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [slug, setSlug] = useState("");
  const [img, setImg] = useState("");

  const navigate = useNavigate();

  const changeName = e => {
    setName(e.target.value);
  };
  const changeDesc = e => {
    setDesc(e.target.value);
  };
  const changePrice = e => {
    setPrice(e.target.value);
  };
  const changeImg = e => {
    // setImg(e.target.files[0]);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onloadend = () => {
      console.log(fileReader.result);
      setImg(fileReader.result);
    };
  };
  const changeSlug = e => {
    setSlug(e.target.value);
  };

  const addData = async e => {
    e.preventDefault();
    const add = await fetch(`${url}/add-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, desc, price: parseInt(price), img, slug }),
    });

    const res = await add.json();
    console.log(res);
    if (res.status === "ok") {
      alert(res.message);
      navigate("/");
    } else {
      alert(res.message);
    }
  };

  return (
    <div>
      <form onSubmit={addData}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={changeName}
          placeholder="Title"
        />
        <br />
        <input
          type="text"
          name="desc"
          value={desc}
          onChange={changeDesc}
          placeholder="Description"
        />
        <br />
        <input
          type="number"
          name="price"
          value={price}
          onChange={changePrice}
          placeholder="Price"
        />
        <br />
        <input
          type="text"
          name="slug"
          value={slug}
          onChange={changeSlug}
          placeholder="Slug"
        />
        <br />
        <input type="file" name="img" onChange={changeImg} />
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
