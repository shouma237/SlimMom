import { CalorieIntake } from "../models/calorieIntakeModel.js";
import { Products } from "../models/productsModel.js";
import { calorieIntakeValidator } from "../validator/validator.js";

// 10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - desired weight)

const publicRoute = async(req, res) => {
	const { error, value } = calorieIntakeValidator(req.body);
	const { height, currentWeight, age, desiredWeight, bloodType } = value;

	if (error) return res.status(400).json({ message: error.message });
	
	const calorieIntake = 10 * currentWeight + 6.25 * height - 5 * age -161 - 10 * (currentWeight - desiredWeight);
	const foodsToAvoid = await Products.find({ [`groupBloodNotAllowed.${bloodType}`]: true });
	
	const categories = foodsToAvoid.map(food => food.categories);
	const uniqueCategories = [... new Set(categories)];

	try {
		res.status(200).json({
			height,
			currentWeight,
			age,
			desiredWeight,
			bloodType,
			foodsToAvoid: uniqueCategories,
			calorieIntake
		});	
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
}

const privateRoute = async(req, res) => {
	const { error, value } = calorieIntakeValidator(req.body);
	const { height, currentWeight, age, desiredWeight, bloodType } = value;

	if (error) return res.status(400).json({ message: error.message });
	const calorieIntake = 10 * currentWeight + 6.25 * height - 5 * age - 161 - 10 * (currentWeight - desiredWeight);
	const foodsToAvoid = await Products.find({ [`groupBloodNotAllowed.${bloodType}`]: true });

	const categories = foodsToAvoid.map(food => food.categories);
	const uniqueCategories = [... new Set(categories)];

	try {

		await CalorieIntake.create({
			height,
			currentWeight,
			age,
			desiredWeight,
			bloodType,
			owner: req.user._id,
			foodsToAvoid: uniqueCategories,
			calorieIntake
		});
		
		res.status(200).json({
			height,
			currentWeight,
			age,
			desiredWeight,
			bloodType,
			owner: req.user._id,
			foodsToAvoid: uniqueCategories,
			calorieIntake
		});
		
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
}

export { publicRoute, privateRoute };