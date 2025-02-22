import {Router} from "express";
import { authenticate,checkAdmin } from "../middleware/authMiddleware.js";
import { addCatgegory, deleteCategory, getCategories, updateCategory } from "../controllers/categoryController.js";


const router=Router();
 
router.route("/categories").get(authenticate,getCategories);
router.route("/categories").post(authenticate,checkAdmin,addCatgegory);
router.route("/categories/:id").put(authenticate,checkAdmin,updateCategory);
router.route("/categories/:id").delete(authenticate,checkAdmin,deleteCategory);

export default router;