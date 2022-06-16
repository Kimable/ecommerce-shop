import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function DeleteProduct({ url }) {
  const [product, setProduct] = useState(null);
  const param = useParams();
  const navigate = useNavigate();
  const productUrl = `${url}/${param.slug}`;

  useEffect(() => {
    async function getProduct() {
      const fetchingProd = await fetch(productUrl);
      const res = await fetchingProd.json();
      setProduct(res);
    }
    getProduct();
  }, []);

  const handleDelete = async () => {
    const fetchingProd = await fetch(`${url}/delete/${param.slug}`, {
      method: "DELETE",
    });
    const res = await fetchingProd.json();
    console.log(res);
    navigate("/");
  };

  return (
    product && (
      <div className="row product-detail">
        <div className="col product-row">
          <div className="image">
            <img src={product.img} alt={product.name} />
          </div>
          <div className="text">
            <h1>{product.name}</h1>
            <p>{product.desc}</p>
            <p>${product.price}</p>
            <button className="btn" onClick={handleDelete}>
              DELETE PRODUCT
            </button>
          </div>
        </div>
        <div className="col">
          <h3>Warning</h3>
          <p>Product once Deleted cannot be recovered</p>
        </div>
      </div>
    )
  );
}
