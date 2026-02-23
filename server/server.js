import express from 'express';
import cors from 'cors';
import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';
import "dotenv/config";
import connectDB from './configs/db.js';
import { clerkMiddleware } from "@clerk/express";
import clerkwebhooks from "./controllers/clerkWebhooks.js";

connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(clerkMiddleware());

app.post("/api/clerk", clerkwebhooks);

app.get('/', (req, res) => res.send('API is working'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

dotenv.config();

export default app;