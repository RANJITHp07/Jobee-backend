import nodemailer from 'nodemailer';
import INodemailer from '../../use_case/interface/nodemailer';

class Nodemailer implements INodemailer {
  private otps: Map<string, string> = new Map();

  generateOTP() {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }

  async sendEmailVerification(email: string, username: string) {
    try {
      console.log(process.env.EMAILID,process.env.PASSWORD)
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: false,
        auth: {
          user: process.env.EMAILID,
          pass: process.env.PASSWORD,
        },
      });

      const otp = this.generateOTP();
      this.otps.set(email, otp);

      const mailOptions = {
        from: 'testingjobee007@gmail.com',
        to: email,
        subject: 'Email Verification',
        html: `
        <div>
          <div style="margin-bottom: 10px">
            Hello ${username}, Welcome to <strong>Jobee</strong>! We are excited to have you on board. To get started, please verify your email address:
          </div>
          <div style="width: 75%; margin: 0 auto; background-color: black; color: white; padding: 4px; font-size: 3rem; text-align: center;">
            <strong style="text">${otp}</strong>
          </div>
        </div>
      `
      };

      await transporter.sendMail(mailOptions);
      return 'Email sent';
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async verifyEmail(enteredOTP: string, email: string) {
    try {
      const expectedOTP = this.otps.get(email);
      if (expectedOTP === enteredOTP) {
        this.otps.delete(email);
        return 'Successfully logged in';
      } else {
        return 'The OTP entered is incorrect';
      }
    } catch (error) {
      throw error;
    }
  }
}

export default Nodemailer;
