import productModel from "../models/product.model.js";
import cloudinary from "cloudinary";

const product = {
  // Adding product to a database
  addProduct: async (req, res) => {
    const { name, desc, price, img, slug } = req.body;

    const friendlySlug = slug.trim().toLowerCase().split(" ").join("-");

    const slugExists = await productModel.findOne({ slug: friendlySlug });
    if (slugExists) {
      return res.send({
        status: "err",
        message: "This slug is already taken. Choose a different one",
      });
    }

    // Adding image via cloudinary API
    let imgUrl;
    if (!img)
      return res.send({ status: "err", message: "Please upload an image" });

    await cloudinary.v2.uploader.upload(
      img,
      { public_id: friendlySlug },
      function (error, result) {
        if (error)
          return res.send({
            status: "err",
            message: "Something went wrong, Please try again",
            errorDesc: error,
          });

        imgUrl = result.secure_url;
        console.log(result, error);
      }
    );

    const addProd = await productModel.create({
      name,
      desc,
      price,
      img: imgUrl,
      slug: friendlySlug,
    });
    return res.send({ status: "ok", message: "Successfully added product" });
  },

  //   Get all products from db
  getProducts: async (req, res) => {
    try {
      const products = await productModel.find();
      return res.send(products);
    } catch (error) {
      return res.send({ status: "err", error: error.message });
    }
  },

  //   Get a single products from db
  getSingleProduct: async (req, res) => {
    const slug = req.params.slug;
    try {
      const product = await productModel.findOne({ slug });
      if (product === null)
        return res.send({ status: "err", message: "Product not found" });
      return res.send(product);
    } catch (error) {
      return res.send({ status: "err", error: error.message });
    }
  },

  //   Get a single products from db
  deleteProduct: async (req, res) => {
    const slug = req.params.slug;
    try {
      const product = await productModel.findOne({ slug });
      if (product === null)
        return res.send({ status: "err", message: "Product not found" });

      const deletedProd = await productModel.deleteOne({ slug });
      return res.send({
        status: "ok",
        message: "product deleted successfully",
      });
    } catch (error) {
      return res.send({ status: "err", error: error.message });
    }
  },

  //   Edit a product
  editProduct: async (req, res) => {
    const { name, desc, price } = req.body;

    try {
      const product = await productModel.findOne({ slug: req.params.slug });
      if (product === null)
        return res.send({ status: "err", message: "Product not found" });

      const updateProd = await productModel.findOneAndUpdate(
        { slug: req.params.slug },
        { name, desc, price }
      );
      return res.send({
        status: "ok",
        message: "product updated successfully",
      });
    } catch (error) {
      return res.send({ status: "err", error: error.message });
    }
  },
};

export default product;
