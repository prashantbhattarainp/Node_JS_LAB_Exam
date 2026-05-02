import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './Routes/userRoutes.js';

connectDB();

const app = express();
app.use(express.json());

app.use('/user', userRoutes);

app.listen(3000, () => {
	console.log('Server running on port 3000');
});