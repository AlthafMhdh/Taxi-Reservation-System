package com.city.taxi.software.city.taxi.backend.DTO.QueryInterface;

public interface BookingsNew {

    int getBookingId();
    String getPassengerName();
    String getPhoneNumber();
    String getPickupLocation();
    String getDroppingLocation();
    double getDistance();
    double getAmount();
}
