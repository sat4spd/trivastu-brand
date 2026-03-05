import nodemailer from "nodemailer";

const smtpConfig = {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587"),
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
};

const transporter = nodemailer.createTransport(smtpConfig as any);

export async function sendLeadEmailToAdmin(lead: any) {
    if (!process.env.EMAIL_FROM) return;

    const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
      <h2 style="color: #c8a45e;">New Lead Received (${lead.sourceApp})</h2>
      <p><strong>Type:</strong> ${lead.leadType}</p>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Phone:</strong> ${lead.phone}</p>
      ${lead.email ? `<p><strong>Email:</strong> ${lead.email}</p>` : ''}
      
      <h3 style="margin-top: 20px;">Additional Details:</h3>
      <pre style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${JSON.stringify(lead.details || {}, null, 2)}</pre>
      
      <p style="margin-top: 30px; font-size: 12px; color: #888;">System Generated Notification - Trivastu Ecosystem</p>
    </div>
  `;

    try {
        await transporter.sendMail({
            from: `"Trivastu System" <${process.env.EMAIL_FROM}>`,
            to: "leads@trivastu.com", // You can change this to a specific admin email
            subject: `🚨 New Lead from ${lead.sourceApp}: ${lead.name}`,
            html: htmlContent,
        });
        console.log("Admin email sent successfully via AWS SES");
    } catch (error) {
        console.error("Error sending AWS SES email:", error);
    }
}
