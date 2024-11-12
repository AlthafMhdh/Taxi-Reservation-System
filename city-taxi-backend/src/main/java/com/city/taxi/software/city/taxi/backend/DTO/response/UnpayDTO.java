package com.city.taxi.software.city.taxi.backend.DTO.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UnpayDTO {

    private int reservationId;
    private String pickupLocation;
    private String droppingLocation;
    private double distance;

    private String vehicleNumber;

    private double amount;

}
