import {Router} from 'express';
import { authenticate,checkAdmin } from '../middleware/authMiddleware.js';
import {getCoupons,addCoupon,updateCoupon,deleteCoupon} from '../controllers/couponController.js';
const router=Router();

router.route('/coupons').get(authenticate,getCoupons);
router.route('/coupons').post(authenticate,checkAdmin,addCoupon);
router.route('/coupons/:id').put(authenticate,checkAdmin,updateCoupon);
router.route('/coupons/:id').delete(authenticate,checkAdmin,deleteCoupon);

export default router;