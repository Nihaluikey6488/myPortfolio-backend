const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendContactEmails = async ({ name, email, subject, message }) => {
  // 1. Notification Email to You (Admin)
  const adminMailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `🚀 New Contact Submission: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4; border-radius: 8px;">
        <h2 style="color: #333;">New Message from Portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #fff; padding: 15px; border-left: 4px solid #000; margin-top: 10px;">
          ${message}
        </div>
      </div>
    `,
  };

  // 2. Auto-reply Email to the Client
  const clientMailOptions = {
    from: `"Nihal Uikey" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Thank you for reaching out, ${name}!`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #050505; color: #fff; border-radius: 8px;">
        <h2 style="color: #D9F95F;">Hi ${name},</h2>
        <p>Thank you for getting in touch! I have received your message regarding "<strong>${subject}</strong>".</p>
        <p>I am currently reviewing your details and will get back to you within 24-48 hours.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>Nihal Uikey</strong><br/>Software Engineer</p>
      </div>
    `,
  };

  // Send both emails asynchronously
  await transporter.sendMail(adminMailOptions);
  await transporter.sendMail(clientMailOptions);
};

module.exports = sendContactEmails;