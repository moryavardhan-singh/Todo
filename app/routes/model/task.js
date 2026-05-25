import mongoose from "mongoose";
const TaskSchema = new mongoose.Schema(
    {
        text:{
            type: String,
            required: true,
        },
    },
    {timestamps:true},
);
export default mongoose.models.Task || mongoose.model("Task",TaskSchema);