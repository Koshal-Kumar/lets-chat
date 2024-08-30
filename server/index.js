import express from "express";
import connectDB from "./config/db.js";
import userRoutes from './Routes/userRoutes.js';
import chatRoutes from './Routes/chatRoutes.js';
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/chat',chatRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`.bgCyan.white));
