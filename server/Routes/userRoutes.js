import { Router } from "express";
import { register,login, allUsers} from "../Controller/userController.js"
import { authorize } from "../MiddleWares/authUser.js";
const router = new Router();

console.log("user route")
router.post('/register', register);
router.post('/login',login);
router.post('/allusers',authorize, allUsers);


export default router;