import express from "express";
import { fetchProducts } from "../../controllers/productsControllers.js";
import authToken from "../../middleware/auth.js";

const router = express.Router();

router.get('/search', authToken, fetchProducts);

export { router };