import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_APP_EMAIL,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });
  transporter.verify((error, success) => {
  if (error) {
    console.error("Email service connection failed:", error);
  } else {
    console.log("Email service ready to send messages.");
  }
});

  // 2. Define the email options
  const mailOptions = {
    from: `${process.env.FROM_NAME || 'ERP System'} <${process.env.GOOGLE_APP_EMAIL || 'noreply@erpsystem.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  // 3. Actually send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
