package com.city.taxi.software.city.taxi.backend.DTO.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class BookingSaveDTO {

    private int operator;
    private String passengerName;
    private String phoneNumber;
    private String pickupLocation;
    private String droppingLocation;
    private double distance;
    private double payment;

}
