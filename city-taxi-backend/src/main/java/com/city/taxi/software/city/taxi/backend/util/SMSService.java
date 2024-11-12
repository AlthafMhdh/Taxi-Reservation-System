package com.city.taxi.software.city.taxi.backend.util;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class SMSService {

    @Value("${twilio.accountSid}")
    private String accountSid;

    @Value("${twilio.authToken}")
    private String authToken;

    @Value("${twilio.phoneNumber}")
    private String twilioPhoneNumber;

    public void sendBookingConfirmation(String to, String driverName, String vehicleNumber, Date bookingDate, String pickupLocation, String droppingLocation) {
        Twilio.init(accountSid, authToken);

        String message = String.format("Dear %s, your booking has been successfully accepted. Driver: %s, Vehicle: %s, Date: %s, Pickup: %s, Drop: %s",
                to, driverName, vehicleNumber, bookingDate, pickupLocation, droppingLocation);

        Message.creator(
                        new com.twilio.type.PhoneNumber(to),
                        new com.twilio.type.PhoneNumber(twilioPhoneNumber),
                        message)
                .create();
    }
}
