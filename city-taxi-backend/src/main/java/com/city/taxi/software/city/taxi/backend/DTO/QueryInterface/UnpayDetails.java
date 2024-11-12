package com.city.taxi.software.city.taxi.backend.DTO.QueryInterface;

public interface UnpayDetails {

    int getReservationId();
    String getPassengerName();
    String getPickupLocation();
    String getDroppingLocation();
    double getDistance();
    String getVehicleNumber();
    double getAmount();
}
