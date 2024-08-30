import {Router} from 'express';
import { authorize } from "../MiddleWares/authUser.js";
import { accessChat, createGroupChat, fetchChats } from '../Controller/chatController.js';

const router = new Router();

router.post('/',authorize,accessChat);
router.get('/',authorize,fetchChats);
router.post('/group',authorize,createGroupChat)
// router.put('/rename',authorize,renameGroup)
// router.put('/groupRemove',authorize,removeFromGroup)
// router.put('/groupAdd',authorize,addToGroup)

export default  router;