import express from 'express';
import jwt from 'jsonwebtoken';
import {registerUser,loginUser} from '../controllers/userControllers.js';

const router = express.Router();

const auth = (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
        return res.json({ message: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, "abcdefgh");
    req.user = decoded;
    return next();
};

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;