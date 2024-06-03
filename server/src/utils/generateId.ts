import mongoose from "mongoose";

export function generateId() {
    return new mongoose.Types.ObjectId().toString();
}