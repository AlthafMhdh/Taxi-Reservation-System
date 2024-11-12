package com.city.taxi.software.city.taxi.backend.DTO.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class BookingResponseDTO {

    private int bookingId;
    private String operatorName;
    private String passengerName;
    private String phoneNumber;
    private String pickupLocation;
    private String droppingLocation;
    private Date bookingDate;

}
