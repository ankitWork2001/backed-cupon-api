import Category from "../models/Category.js";

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

const addCatgegory=async(req,res)=>{
    const {name,slug,isActive}=req.body;
    if(!name||!slug||!isActive){
        return res.status(400).json({error:"All fields are required"});
    }
    try{
        const category=await Category.create({
            name,
            slug,
            isActive,
        })
        res.status(201).json(category);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server error"});
    }
}

const updateCategory=async(req,res)=>{
    const id=req.params.id;
    if(!id){
        return res.status(400).json({error:"Category id is required"});
    }
    const category=await Category.findById(id);
    if(!category){
        return res.status(404).json({error:"Category not found"});
    }
    try{
        const {name,slug,isActive}=req.body;
        const updatedCategory=await Category.findByIdAndUpdate(id,{
            name:name||category.name,
            slug:slug||category.slug,   
            isActive:isActive||category.isActive,
        },{new:true});
        res.status(200).json(updatedCategory);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:"Internal Server error"});
    }
}

const deleteCategory=async(req,res)=>{
    const id=req.params.id;
    if(!id){
        return res.status(400).json({error:"Category id is required"});
    }
    try{
        await Category.findByIdAndDelete(id);
        res.status(200).json({message:"Category deleted successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server error"});
    }
}

export {getCategories,addCatgegory,updateCategory,deleteCategory};