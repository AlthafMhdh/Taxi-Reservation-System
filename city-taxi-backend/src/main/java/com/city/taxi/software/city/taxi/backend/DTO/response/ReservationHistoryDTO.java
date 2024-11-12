package com.city.taxi.software.city.taxi.backend.DTO.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReservationHistoryDTO {

    //reservation
    private int reservationId;
    private String pickupLocation;
    private String droppingLocation;
    private double distance;
    private Date reservationDate;

    //driver
    private String driverName;
    private String vehicleNumber;

    //payment
    private double amount;
}
