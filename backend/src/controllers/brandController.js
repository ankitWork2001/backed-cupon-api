import Brand from "../models/Brand.js";
import { deleteFromCloudinary, getPublicId, uploadToCloudinary } from "../config/firebase.js";

const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

const addBrand = async (req, res) => {
  let { name, logo, isActive } = req.body;
  if (!name || !isActive || !logo) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }
  if(req?.file)
    {
      try{
        const cloudinaryurl=await uploadToCloudinary(req.file.path);
        logo=cloudinaryurl.secure_url;
        console.log(cloudinaryurl.secure_url);
      }
      catch(err)
      {
        console.log(err);
      }
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
  let { name, logo, isActive } = req.body;
  const brand = await Brand.findById(id);
  if (!brand) {
    return res.status(404).json({ error: "Brand not found" });
  }
  if(req?.file)
    {
      try{
        const cloudinaryurl=await uploadToCloudinary(req.file.path);
        console.log(cloudinaryurl.secure_url);
        if(brand.logo)
          {
            try{
              const public_id=getPublicId(brand.logo);
              const result=await deleteFromCloudinary(public_id);
              console.log(result);
            }
            catch(er)
            {
              console.log(er);
            }
          }
          logo=cloudinaryurl.secure_url;
  
        
      }
      catch(err)
      {
        console.log(err);
      }
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
  const brand=await Brand.findById(id);
  if(!brand)
  {
    return res.status(200).json({ message: "Brand does not exists" });
  }
  if(brand.logo)
  {
    try{
      const public_id=getPublicId(brand.logo);
      const result=await deleteFromCloudinary(public_id);
      console.log(result);
    }
    catch(er)
    {
      console.log(er);
    }
  }
  try {
    await Brand.findByIdAndDelete(id);
    return res.status(200).json({ message: "Brand deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server error" });
  }
};
export { getBrands, addBrand, updateBrand,deleteBrand };
