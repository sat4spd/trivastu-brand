import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Lead from "@/models/Lead";
import User from "@/models/User";
import { sendLeadEmailToAdmin } from "@/lib/mailer";
import { sendWhatsAppNotification } from "@/lib/whatsapp";

const ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "https://trivastu.com",
    "https://realty.trivastu.com",
    "https://plot.trivastu.com",
    "https://www.trivastu.com"
];

function getCorsOrigin(request: Request) {
    const origin = request.headers.get("origin") || "";
    return ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
}

// Handle preflight requests (CORS for other domains)
export async function OPTIONS(request: Request) {
    return new NextResponse(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": getCorsOrigin(request),
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, phone, email, sourceApp, leadType, details } = body;

        // Validate minimum required fields
        if (!name || !phone || !sourceApp || !leadType) {
            return NextResponse.json(
                { message: "Missing required fields: name, phone, sourceApp, leadType" },
                { status: 400, headers: { "Access-Control-Allow-Origin": getCorsOrigin(req) } }
            );
        }

        // Connect to MongoDB
        await dbConnect();

        // Find or Create User by phone
        let user = await User.findOne({ phone });
        if (!user) {
            user = await User.create({
                phone,
                name,
                email: email || "",
                role: "customer"
            });
        } else {
            // Update name and email if they were previously unknown
            let updateNeeded = false;
            if (name && (!user.name || user.name === "Unknown")) {
                user.name = name;
                updateNeeded = true;
            }
            if (email && !user.email) {
                user.email = email;
                updateNeeded = true;
            }
            if (updateNeeded) await user.save();
        }

        // Create DB Entry
        const newLead = await Lead.create({
            customerId: user._id,
            name,
            phone,
            email,
            sourceApp,
            leadType,
            details,
        });

        console.log(`✅ Lead saved to DB (ID: ${newLead._id})`);

        // Fire & Forget Notifications (Do not await so response is fast)
        sendLeadEmailToAdmin(newLead).catch(console.error);
        sendWhatsAppNotification(newLead).catch(console.error);

        return NextResponse.json(
            { message: "Lead captured successfully", leadId: newLead._id },
            { status: 201, headers: { "Access-Control-Allow-Origin": getCorsOrigin(req) } }
        );

    } catch (error: any) {
        console.error("Error creating lead:", error);
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500, headers: { "Access-Control-Allow-Origin": getCorsOrigin(req) } }
        );
    }
}
