import mongoose, { Schema, Document } from "mongoose";

export interface ILead extends Document {
    customerId: mongoose.Types.ObjectId;
    name: string;
    phone: string;
    email?: string;
    sourceApp: "BRAND" | "REALTY" | "PLOTS";
    leadType: "GENERAL" | "CONSTRUCTION" | "SITE_VISIT" | "PLOT_QUERY";
    details?: Record<string, any>;
    createdAt: Date;
}

const LeadSchema = new Schema<ILead>({
    customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: false },
    sourceApp: {
        type: String,
        required: true,
        enum: ["BRAND", "REALTY", "PLOTS"]
    },
    leadType: {
        type: String,
        required: true,
        enum: ["GENERAL", "CONSTRUCTION", "SITE_VISIT", "PLOT_QUERY"]
    },
    details: { type: Schema.Types.Mixed, required: false },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);
