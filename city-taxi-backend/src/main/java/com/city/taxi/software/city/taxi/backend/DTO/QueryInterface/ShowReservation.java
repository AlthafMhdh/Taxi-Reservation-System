package com.city.taxi.software.city.taxi.backend.DTO.QueryInterface;

public interface ShowReservation {

    int getReservationId();
    String getPassengerName();
    String getPickupLocation();
    String getDroppingLocation();
    String getPhoneNumber();
    double getDistance();
    double getAmount();

}
