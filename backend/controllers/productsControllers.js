import { Products } from "../models/productsModel.js";

const fetchProducts = async(req, res) => {
	let { q, limit, page } = req.query;
	
	q = q || "";
	limit = limit >= 25 ? 25 : limit;
	page = page || 1;

	try {
		res.status(200).json(await Products
			.find({ title: { $regex: new RegExp(q, 'i') } })
			.skip((page - 1) * limit)
			.limit(limit)
			.select('-__v'));
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
}

export {
	fetchProducts
}