import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Task", taskSchema);

