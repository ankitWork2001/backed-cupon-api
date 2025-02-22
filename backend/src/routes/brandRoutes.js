import {Router} from 'express';
import { authenticate,checkAdmin } from '../middleware/authMiddleware.js';
import { getBrands, addBrand, updateBrand, deleteBrand } from '../controllers/brandController.js';


const router=Router();

router.route("/brands").get(authenticate,getBrands);
router.route("/brands").post(authenticate,checkAdmin,addBrand);
router.route("/brands/:id").put(authenticate,checkAdmin,updateBrand);
router.route("/brands/:id").delete(authenticate,checkAdmin,deleteBrand);

export default router;