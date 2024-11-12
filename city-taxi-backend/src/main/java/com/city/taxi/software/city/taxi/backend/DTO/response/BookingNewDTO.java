package com.city.taxi.software.city.taxi.backend.DTO.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BookingNewDTO {

    private int bookingId;
    private String passengerName;
    private String phoneNumber;
    private String pickupLocation;
    private String droppingLocation;
    private double distance;
    private double amount;

}
