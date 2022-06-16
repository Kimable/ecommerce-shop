import React from "react";
import { Link } from "react-router-dom";

export default function ProductList({ data }) {
  return (
    <div className="product-list">
      {data === null ? (
        <h3>No products to display...</h3>
      ) : (
        data.map(prod => {
          return (
            <div className="product-list-col" key={prod._id}>
              <img src={prod.img} alt={prod.name} />
              <h3>{prod.name}</h3>
              <p>Description: {prod.desc}</p>
              <p>
                <strong>Price: ${prod.price}</strong>
              </p>
              <Link className="btn" to={`/product/${prod.slug}`}>
                Details
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
}
