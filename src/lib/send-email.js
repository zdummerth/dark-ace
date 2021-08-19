import nodemailer from 'nodemailer'
import { google } from 'googleapis'
const OAuth2 = google.auth.OAuth2

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.GOOGLE_NODEMAILER_CLIENT_ID,
    process.env.GOOGLE_NODEMAILER_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_NODEMAILER_REFRESH_TOKEN
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject();
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_ADDRESS,
      accessToken,
      clientId: process.env.GOOGLE_NODEMAILER_CLIENT_ID,
      clientSecret: process.env.GOOGLE_NODEMAILER_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_NODEMAILER_REFRESH_TOKEN
    }
  });

  return transporter;
}

const sendEmail = async (emailOptions) => {
  let emailTransporter = await createTransporter();
  return await emailTransporter.sendMail(emailOptions);
}

export default sendEmail


