package com.city.taxi.software.city.taxi.backend.DTO.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RatingResponseDTO {

    private int ratingId;
    private String ratingValue;

    //passenger
    private String passengerName;
    //reservation
    private String pickupLocation;
    private String dropLocation;
    private Date reservationDate;

}

