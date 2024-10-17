import express from "express";
import { addEntry, deleteEntry, fetchEntries, fetchEntryByDate } from "../../controllers/entriesControllers.js";
import authToken from "../../middleware/auth.js";

const router = express.Router();

router.get('/', authToken, fetchEntries);
router.post('/', authToken, addEntry);
router.get('/:entryDate', authToken, fetchEntryByDate);
router.delete('/:entryId', authToken, deleteEntry);

export { router };