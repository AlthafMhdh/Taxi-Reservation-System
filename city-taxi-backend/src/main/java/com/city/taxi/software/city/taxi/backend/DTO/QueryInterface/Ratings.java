package com.city.taxi.software.city.taxi.backend.DTO.QueryInterface;

import java.util.Date;

public interface Ratings {

    int getRatingId();
    String getRatingValue();

    String getPassengerName();
    String getPickupLocation();
    String getDropLocation();
    Date getReservationDate();
}
