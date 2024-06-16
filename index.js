import express from 'express';
import colors from'colors';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import "dotenv/config.js";
import {connectDB} from './config/db.js';
import bodyParser from 'body-parser'
const PORT = process.env.PORT;
import path from 'path';
import userRouter from "./routes/userRoutes.js"




// Initializing database connection
connectDB();


// Initializing express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())


// Routes
app.use('/api/users', userRouter);
app.get('/', (req, res)=>{
    res.send("Jesus Loves You, Open your heart and let him in")
})


// app.use(express.static(path.join(__dirname ,'dist')));



// Listening for connection
app.listen(PORT, () => console.log(`Visit site on http://localhost:${PORT}`));