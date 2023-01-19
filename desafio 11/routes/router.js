import express from 'express';
const router = express();
import {destroy,form,home, logout} from "../controllers/controller.js"
import { login } from "../middlewares/auth.js";


router.get('/', login, form)
router.post("/home", home)
router.post("/logout",destroy)
router.post("/logout2",logout)

export default router;