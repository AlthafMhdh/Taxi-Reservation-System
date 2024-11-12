package com.city.taxi.software.city.taxi.backend.DTO.QueryInterface;

import java.util.Date;

public interface ReservationHistory {

    int getReservationId();
    String getDriverName();
    String getVehicleNumber();
    String getPickupLocation();
    String getDroppingLocation();
    Date getReservationDate();
    double getDistance();
    double getAmount();
}
