const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const ADMIN_NUMBERS = process.env.ADMIN_WHATSAPP_NUMBERS?.split(",") || [];

export async function sendWhatsAppNotification(lead: any) {
    if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID || ADMIN_NUMBERS.length === 0) {
        console.warn("WhatsApp credentials or admin numbers missing. Skipping notification.");
        return;
    }

    const url = `https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`;

    // Format message text
    let messageText = `*🚨 New Trivastu Lead (${lead.sourceApp})*\n`;
    messageText += `*Type:* ${lead.leadType}\n`;
    messageText += `*Name:* ${lead.name}\n`;
    messageText += `*Phone:* ${lead.phone}\n`;
    if (lead.email) messageText += `*Email:* ${lead.email}\n`;

    if (lead.details) {
        messageText += `*Details:*\n`;
        for (const [key, value] of Object.entries(lead.details)) {
            if (value) messageText += `- ${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}\n`;
        }
    }

    // Send to all admin numbers
    for (const number of ADMIN_NUMBERS) {
        try {
            // Clean phone number: remove +, spaces, dashes. Ensure it has country code if missing (assumes India 91)
            let cleanNum = number.replace(/[\+\-\s]/g, "");
            if (cleanNum.length === 10) cleanNum = "91" + cleanNum;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${WHATSAPP_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messaging_product: "whatsapp",
                    recipient_type: "individual",
                    to: cleanNum,
                    type: "text",
                    text: {
                        preview_url: false,
                        body: messageText,
                    },
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`WhatsApp API Error for ${cleanNum}:`, errorData);
            } else {
                console.log(`WhatsApp Notification sent to ${cleanNum}`);
            }
        } catch (error) {
            console.error(`Failed to send WhatsApp to ${number}:`, error);
        }
    }
}
