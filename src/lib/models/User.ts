import { Category } from "@/types";
import { ObjectId } from "mongodb";
import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    emailVerified: {
        type: Boolean,
        required: false,
    },
    provider: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    categories: {
        type: Array<Category>,
    },
    ideas: {
        type: Array<ObjectId>,
    },
    gallery: {
        type: Array<String>,
        required: false,
    },
    trash: {
        type: Array,
        required: false,
    },
},{timestamps: true})

const User = mongoose.models?.User  || mongoose.model("User", userSchema);
export default User;