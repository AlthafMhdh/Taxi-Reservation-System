package com.city.taxi.software.city.taxi.backend.DTO.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DriverRideDTO {
    //Need form Reservation
    //find By DriverId and ActiveState (true)
    private String passengers;
    private String pickupLocation;
    private String droppingLocation;
    private Date reservationDate;
    private double payment;
    private String Rating;  // form Rating entity

}
