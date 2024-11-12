package com.city.taxi.software.city.taxi.backend.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;


    public void sendRegistrationEmail(String to, String username, String password) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Registration Confirmation");
        message.setText("Dear " + username + ",\n\n"
                + "Thank you for registering with our service.\n\n"
                + "Your login details:\n"
                + "Username: " + to + "\n"
                + "Password: " + password + "\n\n"
                + "Best regards,\nThe City Taxi Reservations Team");

        javaMailSender.send(message);
    }



}
