package com.city.taxi.software.city.taxi.backend.DTO.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PassengerReservationDTO {

    //find By PassengerId and ActiveState (true)

    private String pickupLocation;
    private String droppingLocation;
    private Date reservationDate;
    private String drivers;  // vehicle Number and driverName
    private double payment;

}
