import {Router} from 'express';
import { authenticate,checkAdmin } from '../middleware/authMiddleware.js';
import { getBrands, addBrand, updateBrand, deleteBrand } from '../controllers/brandController.js';
import {upload} from '../config/firebase.js';

const router=Router();

router.route("/brands").get(authenticate,getBrands);
router.route("/brands").post(authenticate,checkAdmin,upload.single('logo'),addBrand);
router.route("/brands/:id").put(authenticate,checkAdmin,upload.single('logo'),updateBrand);
router.route("/brands/:id").delete(authenticate,checkAdmin,deleteBrand);

export default router;