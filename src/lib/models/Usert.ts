import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    usertype: {
        type: Boolean,
        required: true
    },
    categories: {
        type: Array,
        required: false
    },
    ideas: {
        type: Array,
        required: false,
    },
    trash: {
        type: Array,
        required: false,
    }
},{timestamps: true})

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;