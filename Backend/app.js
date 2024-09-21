import express from 'express';
import { config } from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { dbConnect } from './database/dbConnect.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import messageRouter from './router/messageRouter.js';
import userRouter from './router/userRouter.js';
import appointmentRouter from './router/appointmentRouter.js';

const app = express();
config({ path: './config/config.env' });

app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['Set-Cookie'], // If you want to expose any custom headers to the browser
}));

app.get("/", (req, res) => {
    res.send("ok");
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));

app.use('/api/v1/message', messageRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/appointment', appointmentRouter);

dbConnect();

app.use(errorMiddleware);

export default app;
