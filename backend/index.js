import express from 'express';
const app = express();
import cors from 'cors';
app.use(cors({
    origin: ['http://localhost:5173', process.env.FRONTEND_URL],
    credentials: true,
}));
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRouter from './routes/user.routes.js';
dotenv.config();
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import isAuth from './middlewares/auth.js';
app.use(cookieParser());
app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    connectDB();
    console.log(`Server started on port ${port}`);
});


app.use('/api/auth', authRouter);
app.use('/api/users', isAuth, userRouter);

app.get('/', (req,res) => res.send('Server Running ...'));