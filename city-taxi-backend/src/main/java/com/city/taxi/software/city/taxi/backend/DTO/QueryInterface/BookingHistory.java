package com.city.taxi.software.city.taxi.backend.DTO.QueryInterface;

import java.util.Date;

public interface BookingHistory {

     int getBookingId();
    String getPassengerName();
    String getPhoneNumber();
    String getPickupLocation();
    String getDroppingLocation();
    Date getBookingDate();
    double getDistance();
    double getAmount();

}
