package com.city.taxi.software.city.taxi.backend.DTO.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BookingResDTO {

    private int bookingId;
    private String passengerName;
    private String phoneNumber;
    private String pickupLocation;
    private String droppingLocation;
    private Date bookingDate;
    private double distance;
    private double amount;
}
