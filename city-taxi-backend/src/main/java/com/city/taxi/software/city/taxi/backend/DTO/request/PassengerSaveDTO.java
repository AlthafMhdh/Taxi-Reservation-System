package com.city.taxi.software.city.taxi.backend.DTO.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PassengerSaveDTO {

    private String passengerName;

    private String nic;

    private String email;

    private String phoneNumber;

}
