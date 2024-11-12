package com.city.taxi.software.city.taxi.backend.DTO.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PassengerResponseDTO {

    private int passengerId;

    private String passengerName;

    private String NIC;

    private String email;

    private String phoneNumber;

    private Date registrationDate;



}
