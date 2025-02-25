import { defaultIconsList } from "@/types";
import mongoose, { Schema } from "mongoose";

const iconsListSchema = new Schema({
  title: {
    type: String
  },
  data: {
    type: Array<defaultIconsList>
  }
})

// Add this before creating the model to debug

const IconsList = mongoose.models?.IconsList || mongoose.model("IconsList",iconsListSchema);


export default IconsList;