package com.city.taxi.software.city.taxi.backend.DTO.QueryInterface;

import java.util.Date;

public interface DriverDetails {

    String getDriverId();
    String getDriverName();
    String getNIC();
    String getEmail();
    String getPhoneNumber();
    String getVehicleModel();
    String getVehicleNumber();
    Date getRegistrationDate();
    String getAverageRating();
}
