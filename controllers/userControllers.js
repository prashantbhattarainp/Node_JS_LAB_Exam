import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import user from '../models/userModel.js';

export const registerUser = async (req, res) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		return res.status(400).json({ message: 'All fields required' });
	}

	const exists = await user.findOne({ email });
	if (exists) {
		return res.status(400).json({ message: 'Email already in use' });
	}
	const newUser = await user.create({ username, email, password });
	const userData = newUser.toObject();
	delete userData.password;
	return res.status(201).json({ user: userData });
};


export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: 'All fields required' });
	}

	const foundUser = await user.findOne({ email });
	if (!foundUser) {
		return res.status(401).json({ message: 'Invalid credentials' });
	}
	const isMatch = await bcrypt.compare(password, foundUser.password);
	if (!isMatch) {
		return res.status(401).json({ message: 'Invalid credentials' });
	}
	const token = jwt.sign(
		{ id: foundUser._id, email: foundUser.email },
		"abcdefgh",
		{ expiresIn: '1d' }
	);
	const userData = foundUser.toObject();
	delete userData.password;
	return res.status(200).json({ token, user: userData });
};

