import express from 'express';
const userRouter = express.Router();
import {
    registerUser,
    loginUser,
    getMe,
} from '../controllers/usersController.js';



// Routes
userRouter.post('/', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/me', getMe);


export default userRouter;