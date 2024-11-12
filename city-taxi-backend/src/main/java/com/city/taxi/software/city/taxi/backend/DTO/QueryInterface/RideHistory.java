package com.city.taxi.software.city.taxi.backend.DTO.QueryInterface;

import java.util.Date;

public interface RideHistory {

    int getReservationId();
    String getPassengerName();
    String getPickupLocation();
    String getDroppingLocation();
    Date getReservationDate();
    double getDistance();
    double getAmount();
}
