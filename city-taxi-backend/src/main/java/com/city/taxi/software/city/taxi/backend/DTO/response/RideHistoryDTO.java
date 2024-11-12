package com.city.taxi.software.city.taxi.backend.DTO.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RideHistoryDTO {

    //reservation
    private int reservationId;
    private String pickupLocation;
    private String droppingLocation;
    private double distance;
    private Date reservationDate;

    //passenger
    private String passengerName;

    //payment
    private double amount;

    //rating
  //  private String ratingValue;

}
