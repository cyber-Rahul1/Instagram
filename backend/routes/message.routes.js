import express from 'express';
import upload from '../middlewares/multer.js';
import { getMessages, sendMessage } from '../controllers/message.controller.js';
const messageRouter = express.Router();


messageRouter.post('/sendmessage/:receiver', upload.single('image'), sendMessage);
messageRouter.get('/getmessages/:receiver', getMessages);



export default messageRouter;