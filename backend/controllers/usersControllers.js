import { User } from "../models/usersModel.js";
import { signupValidator, signinValidator } from "../validator/validator.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
	const { error, value } = signupValidator(req.body);
	
	if (error) return res.status(400).json({ message: error.message });

	try {
		const { name, email, password } = value;
		
		const userExist = await User.findOne({ email });
		
		if (userExist) return res.status(409).json({ message: 'User already exists!'});

		const hashedPassword = await bcrypt.hash(password, 10);
		
		const newUser = await User.create({
			name,
			email,
			password: hashedPassword
		});

		res.status(201).json({
			_id: newUser._id,
			email: newUser.email,
			name: newUser.name,
		});

	} catch (e) {
		res.status(500).json({ message: e.message });
	}
}

const signin = async (req, res) => {
	const { error, value } = signinValidator(req.body);
	const { email, password } = value;	

	if (error) return res.status(400).json({ message: error.message });

	try {
		const existingUser = await User.findOne({ email });

		if (!existingUser) return res.status(401).json({ message: 'Wrong email or password!' });

		const payload = {id: existingUser.id};
		const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h'} );

		await User.findByIdAndUpdate(existingUser.id, { token });

		const passwordMatched = await bcrypt.compare(password, existingUser.password);

		if (!passwordMatched) return res.status(401).json({ message: 'Wrong email or password!' });

		res.status(200).json({
			user: {
				_id: existingUser._id,
				name: existingUser.name,
				email: existingUser.email,
				token,
			}
		});

	} catch (e) {
		res.status(500).json({ message: e.message });
	}
}

const logout = async (req, res) => {
	try {
		await User.findByIdAndUpdate(req.user._id, { token: null });
		res.status(200).json({ message: 'Log out!' });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
}

export {
	signup,
	signin,
	logout
}