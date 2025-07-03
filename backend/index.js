import express from 'express';
const app = express();
import cors from 'cors';
app.use(cors({
    origin: ['http://localhost:5173', 'https://instagram-n6oq.onrender.com', 'https://instagram-n6oq.onrender.com/api/auth/googlelogin', process.env.FRONTEND_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
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

const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});




app.listen(port, () => {
    connectDB();
    console.log(`Server started on port ${port}`);
});


app.use('/api/auth', authRouter);
app.use('/api/users', isAuth, userRouter);
app.use('/api/posts', isAuth, postRouter);
app.use('/api/message', isAuth, messageRouter);



app.get('/', (req,res) => res.send('Server Running ...'));