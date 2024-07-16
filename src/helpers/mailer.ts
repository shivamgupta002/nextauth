import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "9451614ccd60cc",
        pass: "4a6015cc0eb323",
      },
    });

    const mailOptions = {
      from: "shivam@shivam.ai",
      to: email,
      subject:
        emailType === "Verify" ? "Verify Your email" : "Reset You password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}"></a> to ${
        emailType === "VERIFY" ? "Verify Your email" : "Reset Your password "
      }  or copy and paste the link below in your browser
      <br>
      ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
