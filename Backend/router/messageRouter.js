import express from 'express'
import {isAdminAuthenticated} from '../middlewares/auth.js'
import { getAllMessages, sendMessage } from '../controller/messageController.js';
const router=express.Router();

router.post('/send',sendMessage)
router.get('/getMessages',isAdminAuthenticated,getAllMessages)
export default router;