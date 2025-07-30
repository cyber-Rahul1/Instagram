import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';



app.use(cors({
    origin: ['http://localhost:5173', 'https://instagram-n6oq.onrender.com', 'https://instagram-n6oq.onrender.com/api/auth/googlelogin', process.env.FRONTEND_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

import connectDB from './config/db.js';
import userRouter from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import isAuth from './middlewares/auth.js';
import postRouter from './routes/posts.routes.js';
import messageRouter from './routes/message.routes.js';
import storyRouter from './routes/story.routes.js';
import { Server } from 'socket.io';

const io = new Server(server,{
    cors: {
        origin: ['http://localhost:5173', 'https://instagram-n6oq.onrender.com', 'https://instagram-cyber-rahul1s-projects.vercel.app/', 'https://instagram-n6oq.onrender.com/api/auth/googlelogin', process.env.FRONTEND_URL],
    }
});

const onlineUsers = {}

export const getReceiverSocketId = (receiver) => {
    return onlineUsers[receiver]
}

io.on('connection', (socket) => {
    console.log('New client connected' , socket.id);

    socket.on('addUser', (userId) => {
            onlineUsers[userId] = socket.id;

    });


    io.emit('onlineUsers', Object.keys(onlineUsers));


    socket.on('disconnect', () => { delete Object.keys(onlineUsers) });
    
})


export { io }

const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});




server.listen(port, () => {
    connectDB();
    console.log(`Server started on port ${port}`);
});


app.use('/api/auth', authRouter);
app.use('/api/users', isAuth, userRouter);
app.use('/api/posts', isAuth, postRouter);
app.use('/api/story', isAuth, storyRouter);
app.use('/api/messages', isAuth, messageRouter);



app.get('/', (req,res) => res.send('Server Running ...'));