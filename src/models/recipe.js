import mongoose from "mongoose";

const { Schema } = mongoose;

const recipeSchema = new Schema({
    recipe_id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    recipe_title: { type: String, trim: true, required: true},
    method: { type: String },
    servings: {type : Number},
    image_url: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Foreign key to User model
});

export default mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);