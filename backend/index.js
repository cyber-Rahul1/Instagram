import express from 'express';
const app = express();
import cors from 'cors';
app.use(cors({
    origin: ['http://localhost:5173', 'https://instagram-n6oq.onrender.com', process.env.FRONTEND_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRouter from './routes/user.routes.js';
dotenv.config();
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import isAuth from './middlewares/auth.js';
import postRouter from './routes/posts.routes.js';
import messageRouter from './routes/message.routes.js';


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const port = process.env.PORT || 3000;

app.listen(port, () => {
    connectDB();
    console.log(`Server started on port ${port}`);
});


app.use('/api/auth', authRouter);
app.use('/api/users', isAuth, userRouter);
app.use('/api/posts', isAuth, postRouter);
app.use('/api/message', isAuth, messageRouter);



app.get('/', (req,res) => res.send('Server Running ...'));