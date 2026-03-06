import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    phone: string;
    name: string;
    role: string;
    email: string;
    budget: number;
    locationPreference: string;
    propertyType: string;
    timeline: string;
    isActive: boolean;
}

const UserSchema = new Schema<IUser>({
    phone: { type: String, required: true, unique: true },
    name: { type: String, default: "" },
    role: { type: String, enum: ["admin", "agent", "customer"], default: "customer" },
    email: { type: String, default: "" },
    budget: { type: Number, default: 0 },
    locationPreference: { type: String, default: "" },
    propertyType: { type: String, default: "" },
    timeline: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
