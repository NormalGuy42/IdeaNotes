import mongoose, { models, Schema } from "mongoose";


const verificationSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,
        required: true
    }
},{timestamps: true})

const Verification = mongoose.models.Verification || mongoose.model('Verification', verificationSchema)

export default Verification;