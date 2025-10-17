import * as R from "ramda";
import dotenv from "dotenv";
import { buildResponse } from "../utils/respond.js";
import { generateToken } from "../middleware/AuthenticationMiddleWare.js";
import { User } from "../model/user.js";
import  {hashPassword, retriveUserName, verificationCode } from "../utils/auxilliaryFn.js";
import renderTemplate from "../utils/templateRender.js";
import EmailService from "../emails/verifyEmail/auxFn.js";
import crypto from "crypto";
dotenv.config()

class AuthService {
  constructor(emailService = new EmailService()) {
    this.emailService = emailService;
  }
  async signupUser({email}) {

    const existing = User.findByEmail(u => u.email === email);
    if (R.isNil(existing)) {
      return buildResponse(false, "User already exists");
    };


const name = retriveUserName(email) ;
const html = await renderTemplate("welcome", {
    name,
    verificationCode,
    year: new Date().getFullYear(),
  });


const emailResponse = await this.emailService.sendEmail(
    email,
    "Verify your AI Chatbot account",
      `Your verification code is ${verificationCode}`,
     html
  );

  const newUser = new User({ email: email ,
      verificationCode,
      // createdAt: new Date(),
    });
await newUser.save();
 return {  emailStatus: emailResponse.success ? "sent" : "failed",
     emailMessageId: emailResponse.messageId || null,}

  }


// Verify the code sent by the user
  async verifyUser(email, userVerificationCode,password) {  
    const user = await User.findByEmail(email);
    if (!user) {
      return buildResponse(false, "User not found");
    }
console.log( "this is the users email :", email )
    if (user.verified) {
      return buildResponse(true, "User already verified");
    }

    if (user.verificationCode !== userVerificationCode) {
      return buildResponse(false, "Invalid verification code");
    }
    
    const encryptedPassword = await hashPassword(password);
    const updateResult = await User.updateUser(email, {
    password: encryptedPassword,
    verified: true,
    verificationCode: null,
    updatedAt: new Date(),
  });
  
    await verifiedUser.save();
    // Generate token
    const token = generateToken({ id:User.userData._id, email:user.email });

    return buildResponse(true, "User verified successfully", {
      token,
      user: { id: user._id, email: user.email },
      updateResult
    });
  }



  async loginUser(email, password) {
    return users.find(u => u.email === email && u.password === password) || null;
  }

  async findOrCreateUser(profile) {
    let user = users.find(u => u.id === profile.id);
    if (!user) {
      user = { id: profile.id, email: profile.emails?.[0]?.value || null };

       const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  const token = generateToken(user.data); 
  res.json({ ...user, token });

      users.push(user);
    }
    return user;
  }


// request for reset password :
async passwordResetService({email}) {
  const user = await User.findByEmail(email)
  
    if (!user) {
      return buildResponse(false, "User not found");
    }

    // Generate a secure token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetExpires = new Date(Date.now() + 10 * 60 * 1000); // expires in 10 minutes

    await User.update(email, { resetToken, resetExpires });

    // Generate email template
    const html = await renderTemplate("resetEmail", {
      name: user.email.split("@")[0],
      resetLink:RESET_LINK ,
    });

    // Send email
    const emailResponse = await this.emailService.sendEmail(
      email,
      "Password Reset Request",
      `Use this link to reset your password: https://yourapp.com/reset-password?token=${resetToken}`,
      html
    );

    return buildResponse(true, "Password reset email sent", {
      emailStatus: emailResponse.success ? "sent" : "failed",
    });
  }
  
// reset password :
  async resetPassword({ token, newPassword }) {
    const user = await User.findOne({ resetToken: token });
    if (!user) {
      return buildResponse(false, "Invalid or expired token");
    }

    // Check token expiration
    if (user.resetExpires < new Date()) {
      return buildResponse(false, "Reset token has expired");
    }

    // Hash new password
    const hashed = await hashPassword(newPassword);

    // Update password and clear token
    await User.update(user.email, {
      password: hashed,
      resetToken: null,
      resetExpires: null,
    });
    return buildResponse(true, "Password reset successfully");
  }

}





export default AuthService; 
