import nodemailer from 'nodemailer'
import { google } from 'googleapis'
const OAuth2 = google.auth.OAuth2

console.log('env vars', process.env.GOOGLE_NODEMAILER_CLIENT_ID)
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
      user: process.env.OUTGOING_EMAIL_ADDRESS,
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


// from - The email address of the sender. All email addresses can be plain ‘sender@server.com’ or formatted '“Sender Name” sender@server.com', see Address object for details
// to - Comma separated list or an array of recipients email addresses that will appear on the To: field
// cc - Comma separated list or an array of recipients email addresses that will appear on the Cc: field
// bcc - Comma separated list or an array of recipients email addresses that will appear on the Bcc: field
// subject - The subject of the email
// text - The plaintext version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘/var/data/…'})
// html - The HTML version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘http://…'})
// attachments - An array of attachment objects (see Using attachments for details). Attachments can be used for embedding images as well.

// sender - An email address that will appear on the Sender: field (always prefer from if you’re not sure which one to use)
// replyTo - An email address that will appear on the Reply-To: field
// inReplyTo - The Message-ID this message is replying to
// references - Message-ID list (an array or space separated string)
// envelope - optional SMTP envelope, if auto generated envelope is not suitable (see SMTP envelope for details)
