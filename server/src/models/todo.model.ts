import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;