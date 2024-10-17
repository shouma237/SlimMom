import mongoose, { Schema } from "mongoose";

const entriesSchema = new Schema({
	food: {
		_id: { type: String },
		categories: { type: String },
		weight: { type: Number },
		title: { type: String },
		calories: { type: Number },
		groupBloodNotAllowed: { type: Array },
		grams: { type: Number }
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
}, 
{ timestamps: true },
);

export const Entries = mongoose.model('entries', entriesSchema);