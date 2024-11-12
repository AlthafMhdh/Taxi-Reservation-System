package com.city.taxi.software.city.taxi.backend.util;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class SMSServiceReserve {

    private String accountSid;



    @Value("e88adf499ffc8fa6e41ee95d06323a06")
    private String authToken;

    @Value("+16145080043")
    private String twilioPhoneNumber;

    public void sendReservationConfirmation(String to, String driverName, String vehicleNumber, Date reservationDate, String pickupLocation, String droppingLocation) {
        Twilio.init(accountSid, authToken);

        // Format the phone number to E.164 format
        String formattedTo = formatPhoneNumber(to);

        String message = String.format("Dear %s, your reservation has been success. Driver: %s, Vehicle: %s, Date: %s, Pickup: %s, Drop: %s",
                to, driverName, vehicleNumber, reservationDate, pickupLocation, droppingLocation);

        Message.creator(
                        new com.twilio.type.PhoneNumber(formattedTo),
                        new com.twilio.type.PhoneNumber(twilioPhoneNumber),
                        message)
                .create();
    }

    private String formatPhoneNumber(String phoneNumber) {
        // Remove any non-numeric characters
        String cleanedNumber = phoneNumber.replaceAll("[^0-9]", "");

        // Prepend the country code if missing (assuming Sri Lanka country code for example)
        if (!cleanedNumber.startsWith("+94")) {
            cleanedNumber = "+94" + cleanedNumber.replaceFirst("^0+(?!$)", "");
        }

        return cleanedNumber;
    }


}
