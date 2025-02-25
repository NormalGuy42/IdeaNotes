import mongoose, { Schema } from "mongoose";

export interface IdeaInterface extends Document {
    _id: mongoose.Types.ObjectId;
    userID: string;
    ideaName: string;
    ideaCategory: string;
    ideaDescription: string;
    ideaNotes?: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}


const ideaSchema = new Schema<IdeaInterface>({
    userID: {
        type: String,
        required: [true,"User ID is required"],
    },
    ideaName: {
        type: String,
        required: [true, "Name is required"]
    },
    ideaCategory: {
        type: String,
        required: [true, "Category is required"],
    },
    ideaDescription: {
        type: String,
        required: [true, "Description is required"]
    },
    status: {
        type: String,
        required: false,
    },
    ideaNotes: {
        type: String,
        required: false,
    }
},{timestamps: true})

const Idea = mongoose.models?.Idea || mongoose.model("Idea", ideaSchema);
export default Idea;