import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { targetEmail, otp, validMins, appPassword, gmail, senderName, subject } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: gmail, pass: appPassword },
    });

    const mailOptions = {
      from: `"${senderName}" <${gmail}>`,
      to: targetEmail,
      subject: subject || `${otp} is your verification code`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
          <h2>${senderName} Authentication</h2>
          <p>Your OTP code is:</p>
          <h1 style="background: #f4f4f4; padding: 10px; letter-spacing: 5px; color: #333;">${otp}</h1>
          <p>This code is valid for ${validMins} minutes.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: "OTP Sent Successfully!" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
