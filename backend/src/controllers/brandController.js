import Brand from "../models/Brand.js";

const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

const addBrand = async (req, res) => {
  const { name, logo, isActive } = req.body;
  if (!name || !isActive || !logo) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }
  try {
    const brand = await Brand.create({
      name,
      logo,
      isActive,
    });
    res.status(201).json(brand);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

const updateBrand = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Please provide brand id" });
  }
  const { name, logo, isActive } = req.body;
  const brand = await Brand.findById(id);
  if (!brand) {
    return res.status(404).json({ error: "Brand not found" });
  }
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      {
        name: name || brand.name,
        logo: logo || brand.logo,
        isActive: isActive || brand.isActive,
      },
      { new: true }
    );
    res.status(200).json(updatedBrand);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
};

const deleteBrand = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Please provide brand id" });
  }
  try {
    await Brand.findByIdAndDelete(id);
    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
};
export { getBrands, addBrand, updateBrand,deleteBrand };
