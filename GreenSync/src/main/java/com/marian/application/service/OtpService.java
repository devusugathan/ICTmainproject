package com.marian.application.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Random;
import java.util.concurrent.*;

@Service
public class OtpService {
    private final HashMap<String, String> otpStorage = new HashMap<>();
    private final HashMap<String, Long> otpTimestamps = new HashMap<>();
    private final HashMap<String, Boolean> otpVerified = new HashMap<>(); // Tracks OTP verification status

    private static final long OTP_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes

    @Autowired
    private JavaMailSender mailSender;

    // Scheduled task to remove expired OTPs
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    public OtpService() {
        scheduler.scheduleAtFixedRate(this::cleanExpiredOtps, 1, 1, TimeUnit.MINUTES);
    }

    // ✅ 1️⃣ Generate OTP
    public String generateOtp(String email) {
        if (!email.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new IllegalArgumentException("Invalid email format");
        }

        String otp = String.format("%06d", new Random().nextInt(1000000));
        otpStorage.put(email, otp);
        otpTimestamps.put(email, System.currentTimeMillis());
        otpVerified.put(email, false); // Mark OTP as not verified

        sendEmail(email, otp);
        return otp;
    }

    // ✅ 2️⃣ Verify OTP with expiration check
    public boolean verifyOtp(String email, String otp) {
        if (!otpStorage.containsKey(email)) return false;

        long currentTime = System.currentTimeMillis();
        if (currentTime - otpTimestamps.get(email) > OTP_EXPIRATION_TIME) {
            otpStorage.remove(email);
            otpTimestamps.remove(email);
            otpVerified.remove(email);
            return false; // OTP expired
        }

        boolean isValid = otp.equals(otpStorage.get(email));
        if (isValid) {
            otpVerified.put(email, true); // Mark OTP as verified
        }
        return isValid;
    }

    // ✅ 3️⃣ Check if OTP was verified (for password reset)
    public boolean isOtpVerified(String email) {
        return otpVerified.getOrDefault(email, false);
    }

    // ✅ 4️⃣ Clear OTP after password reset
    public void clearOtp(String email) {
        otpStorage.remove(email);
        otpTimestamps.remove(email);
        otpVerified.remove(email);
    }

    // ✅ Send OTP Email
    private void sendEmail(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Password Reset OTP");
        message.setText("Your OTP is: " + otp + " (Valid for 5 minutes)");
        mailSender.send(message);
    }

    // ✅ Clean expired OTPs periodically
    private void cleanExpiredOtps() {
        long currentTime = System.currentTimeMillis();
        otpTimestamps.entrySet().removeIf(entry -> currentTime - entry.getValue() > OTP_EXPIRATION_TIME);
        otpStorage.keySet().removeIf(email -> !otpTimestamps.containsKey(email));
        otpVerified.keySet().removeIf(email -> !otpTimestamps.containsKey(email));
    }
}
