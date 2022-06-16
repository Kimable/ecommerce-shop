import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AddProduct from "./components/AddProduct";
import DeleteProduct from "./components/DeleteProduct";
import ProductDetail from "./components/ProductDetail";
import ProductList from "./components/ProductList";

function App() {
  const url = "http://localhost:9200/products/api";
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      const req = await fetch(url);
      const data = await req.json();
      setData(data);
    }
    getData();
  }, [url]);

  console.log(data);

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList data={data} />} />
          <Route path="/product/:slug" element={<ProductDetail url={url} />} />
          <Route
            path="/product/delete/:slug"
            element={<DeleteProduct url={url} />}
          />
          <Route path="/add-product" element={<AddProduct url={url} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
