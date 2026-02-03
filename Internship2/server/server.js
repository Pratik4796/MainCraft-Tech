import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Task from "./models/Task.js";

dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//mongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));


app.post("/add", async (req, res) => {
    try {
        const task = new Task({ text: req.body.text });
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/task", async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);    
})