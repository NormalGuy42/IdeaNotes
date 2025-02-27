import mongoose, { Schema } from "mongoose";


const waitlistSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
}, {timestamps: true})

const Waitlist = mongoose.models?.Waitlist || mongoose.model("Waitlist", waitlistSchema);
export default Waitlist;