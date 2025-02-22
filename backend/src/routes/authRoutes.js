import {Router} from 'express';
import {register,login,logout} from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';
const router=Router();


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(authenticate,logout);

export default router;