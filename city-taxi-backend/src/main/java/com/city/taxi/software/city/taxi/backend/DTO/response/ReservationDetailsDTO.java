package com.city.taxi.software.city.taxi.backend.DTO.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReservationDetailsDTO {

    //reservation
    private int reservationId;
    private String pickupLocation;
    private String droppingLocation;
    private double distance;
    private Date reservationDate;
    //passenger
    private String passengerName;
    //driver
    private String driverName;
    private String vehicleNumber;
    //payment
    private double payment;
}
