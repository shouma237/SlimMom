import mongoose, { Schema } from "mongoose";

const calorieSchema = new Schema({
	height: { 
		type: Number,
		required: [true, 'Height is required!'] 
	},
	currentWeight: {
		type: Number,
		required: [true, 'Current weight is required!'] 
	},
	age: {
		type: Number,
		required: [true, 'Age is required!']
	},
	desiredWeight: {
		type: Number,
		required: [true, 'Desired weight is required!']
	},
	bloodType: {
		type: Number,
		required: [true, 'Blood type is required!']
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	foodsToAvoid: {
		type: Array
	},
	calorieIntake: { type: Number}
}, 
{ 	
	timestamps: true,
	collection: 'calorieIntake'
}
);

export const CalorieIntake = mongoose.model('calorieIntake', calorieSchema);