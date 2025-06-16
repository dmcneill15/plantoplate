import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    username: { type: String, trim: true, required: true },
    email_id: { type: String, trim: true, required: true, unique: true },
    password: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model('User', userSchema);