package com.city.taxi.software.city.taxi.backend.DTO.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class NewReservationDTO {

    private int passengers;
    private String pickupLocation;
    private String droppingLocation;
    private double distance;
    private double payment;


}
