import mongoose, { Schema } from "mongoose";

const productsSChema = new Schema({
	categories: { type: String },
	weight: { type: Number },
	title: { type: String },
	calories: { type: Number },
	groupBloodNotAllowed: [{ type: Schema.Types.Mixed }]
}, 
{ 
	versionKey: false, 
	toJSON: { versionKey: false }, 
	toObject: { versionKey: false }
}
);

export const Products = mongoose.model('products', productsSChema);