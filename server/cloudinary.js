import "dotenv/config";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

let imgUrl;
// Adding image via cloudinary API
cloudinary.v2.uploader.upload("img/hoodie.png", function (error, result) {
  console.log(result.secure_url);
});
