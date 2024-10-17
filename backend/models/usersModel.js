import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name is required!']
	},
	email: {
		type: String,
		required: [true, 'Email is required!'],
		unique: true
	},
	password: {
		type: String,
		required: [true, 'Password is required!']
	},
	token: {
		type: String,
		default: null,
	}
});

export const User = mongoose.model('user', userSchema);
