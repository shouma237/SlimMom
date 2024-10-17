import app from "./app.js";
import 'dotenv/config';
import mongoose from 'mongoose';

const { DB_HOST } = process.env;
const PORT = 3500;

mongoose
	.connect(DB_HOST,{})
	.then(() => {
		app.listen(PORT, () => {
		  console.log(`Server is running. Use our API on port: ${PORT}`);
		});
		console.log('Connected to database!');
	})
	.catch(e => {
		console.log(`Error: ${e.message}`);
		process.exit(1);
	})
