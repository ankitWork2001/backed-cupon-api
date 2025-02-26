import {Router} from 'express';
import { authenticate,checkAdmin } from '../middleware/authMiddleware.js';

import { addProduct, getProducts,getsingleProduct,updateProduct,deleteProduct } from '../controllers/productController.js';

import {upload} from '../config/firebase.js';

const router = Router();

router.route('/products').get(authenticate,getProducts);
router.route('/products/:id').get(authenticate,getsingleProduct);
router.route('/products').post(authenticate,checkAdmin,upload.single('img'),addProduct);
router.route('/products/:id').put(authenticate,checkAdmin,upload.single('img'),updateProduct);
router.route('/products/:id').delete(authenticate,checkAdmin,deleteProduct);

export default router;