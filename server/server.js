import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import cors from "cors";
import router from "./routes/productRoutes.js";

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 9200;

const db = mongoose
  .connect(process.env.MONGO_URI)
  .then(data => {
    console.log("connected to database");
  })
  .catch(err => {
    console.log(
      `Cannot connect to database, Try again Later. Error message: ${err.message}`
    );
  });

app.use("/products/api", router);

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

app.listen(port, () => {
  console.log(`Server running successfully on port ${port}`);
});
