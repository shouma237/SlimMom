import express from 'express';
import { signup, signin, logout } from '../../controllers/usersControllers.js';
import authToken from '../../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout', authToken, logout);

export { router };
