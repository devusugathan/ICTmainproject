package com.marian.application.controller;

import com.marian.application.service.OtpService;
import com.marian.application.model.GreenSyncInfo;
import com.marian.application.repository.GreenSyncInterface;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import org.mindrot.jbcrypt.BCrypt;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3001") // Allow frontend access
public class ForgotPasswordController {

    @Autowired
    private OtpService otpService;

    @Autowired
    private GreenSyncInterface greensyncrepo;  // Inject Repository

    // ✅ 1️⃣ Send OTP
    @PostMapping("/forgotpassword")
    public String sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        otpService.generateOtp(email);
        return "OTP sent successfully!";
    }

    // ✅ 2️⃣ Verify OTP
    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");

        if (otpService.verifyOtp(email, otp)) {
            return "OTP verified!";
        } else {
            return "Invalid OTP!";
        }
    }

    // ✅ 3️⃣ Reset Password (AFTER OTP Verification)
    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("newPassword");

        if (!otpService.isOtpVerified(email)) {
            return "OTP not verified. Cannot reset password.";
        }

        // ✅ Hash the new password
        String hashedPassword = BCrypt.hashpw(newPassword, BCrypt.gensalt(12));

        // ✅ Find the user in the database and update the password
        Optional<GreenSyncInfo> userOptional = Optional.ofNullable(greensyncrepo.findByEmailId(email));
        if (userOptional.isPresent()) {
            GreenSyncInfo user = userOptional.get();
            user.setLoginPassword(hashedPassword);  // Update password
            greensyncrepo.save(user);  // Save updated user

            // ✅ Clear OTP after successful password reset
            otpService.clearOtp(email);

            return "Password reset successful!";
        } else {
            return "User not found!";
        }
    }
}
