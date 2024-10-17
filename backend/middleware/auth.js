import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { User } from '../models/usersModel.js';

const { SECRET_KEY } = process.env;

const authToken = async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) return res.status(400).json({ message: 'Invalid token!'});

	const [bearer, token] = authorization.split(" ");

	if (!bearer || !token) return res.status(401).json({ message: 'Unauthorized access! '});

	try {
		const { id } = jwt.verify(token, SECRET_KEY);
		
		const user = await User.findById(id);

		if (!user || user.token !== token || !user.token) return res.status(401).json({ message: 'Unauthorized access! '});

		req.user = user;
		next();

	} catch (e) {
		res.status(400).json({ message: e.message });
	}
}

export default authToken;