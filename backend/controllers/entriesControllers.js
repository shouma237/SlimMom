import { Entries } from "../models/entriesModel.js";
import { entryValidator } from "../validator/validator.js";

const fetchEntries = async (req, res) => {
	const id = req.user._id;
	try {
		res.status(200).json(await Entries
			.find({ owner: id })
			.select('-__v -updatedAt'));
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
}

const addEntry = async (req, res) => {
	const { error, value } = entryValidator(req.body);

	if (error) return res.status(400).json({ message: error.message });

	try {
		const id = req.user._id;

		res.status(200).json(await Entries.create({ food: value, owner: id }));
	} catch (e) {
		res.status(500).json({ message: e.message});
	}
}

const fetchEntryByDate = async (req, res) => {
	const entryDateString = req.params.entryDate;
	const entryDate = new Date(entryDateString);

	const startOfDay = new Date(entryDate);
	startOfDay.setHours(0, 0, 0, 0);
	const lastOfDay = new Date(entryDate);
	lastOfDay.setHours(23, 59, 59, 999);

	try {
		const existingEntry = await Entries.find({ 
			owner: req.user.id, 
			createdAt: {
				$gte: startOfDay,
				$lte: lastOfDay,
			} 
		}).select('-__v -updatedAt');

		if (!existingEntry) return res.status(400).json({ message: 'Entry does not exist!'});

		res.status(200).json(existingEntry);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
}

const deleteEntry = async (req, res) => {
	const entryId = req.params.entryId;

	try {
		const existingEntry = await Entries.findByIdAndDelete(entryId);

		if (!existingEntry) return res.status(400).json({message: 'Entry does not exist!' });
		
		res.status(200).json({ message: 'Entry Deleted!' });	
	} catch (e) {
		res.status(500).json({ message: e.message})
	}
}

export {
	fetchEntries,
	addEntry,
	deleteEntry,
	fetchEntryByDate
}