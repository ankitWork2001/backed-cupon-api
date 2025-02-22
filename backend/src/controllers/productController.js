import Product from "../models/Product.js";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate("category brand");
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getsingleProduct = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }
  try {
    const product = await Product.findById(id).populate("category brand");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addProduct = async (req, res) => {
  const {
    name,
    image,
    price,
    discount,
    finalPrice,
    category,
    brand,
    affiliateLink,
    dealExpiry,
  } = req.body;
  if (
    !name ||
    !price ||
    !discount ||
    !finalPrice ||
    !category ||
    !brand ||
    !affiliateLink ||
    !dealExpiry
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const product =await Product.create({
      name,
      image,
      price,
      discount,
      finalPrice,
      category,
      brand,
      affiliateLink,
      dealExpiry,
    });
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const {
    name,
    image,
    price,
    discount,
    finalPrice,
    category,
    brand,
    affiliateLink,
    dealExpiry,
  } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }
  const existingProduct = await Product.findById(id);
  if (!existingProduct) {
    return res.status(404).json({ message: "Product not found" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name: name || existingProduct.name,
        image: image || existingProduct.image,
        price: price || existingProduct.price,
        discount: discount || existingProduct.discount,
        finalPrice: finalPrice || existingProduct.finalPrice,
        category: category || existingProduct.category,
        brand: brand || existingProduct.brand,
        affiliateLink: affiliateLink || existingProduct.affiliateLink,
        dealExpiry: dealExpiry || existingProduct.dealExpiry,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const deleteProduct = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export { getProducts, getsingleProduct, addProduct ,updateProduct,deleteProduct};
