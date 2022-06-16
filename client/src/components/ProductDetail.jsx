import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function ProductDetail({ url }) {
  const [product, setProduct] = useState(null);
  const param = useParams();
  const productUrl = `${url}/${param.slug}`;

  useEffect(() => {
    async function getProduct() {
      const fetchingProd = await fetch(productUrl);
      const res = await fetchingProd.json();
      setProduct(res);
    }
    getProduct();
  }, []);

  return (
    product && (
      <div className="product-detail-row">
        <div className="product-detail-col row">
          <div className="image">
            <img src={product.img} alt={product.name} />
          </div>
          <div className="text">
            <h1>{product.name}</h1>
            <p>{product.desc}</p>
            <p>${product.price}</p>
            <Link className="btn" to="/">
              Buy Now
            </Link>
          </div>
        </div>
        <div className="product-detail-col">
          <h3>Shipping Details</h3>
          <p>Free shipping</p>
        </div>
      </div>
    )
  );
}
