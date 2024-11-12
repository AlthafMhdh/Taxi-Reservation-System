package com.city.taxi.software.city.taxi.backend.DTO.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ReservationResponseDTO {

    //reservation
    private int reservationId;
    private String pickupLocation;
    private String droppingLocation;
    private double distance;

    //passenger
    private String passengerName;
    private String phoneNumber;

    //payment
    private double amount;


}
