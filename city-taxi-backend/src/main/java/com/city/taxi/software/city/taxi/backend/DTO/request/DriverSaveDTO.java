package com.city.taxi.software.city.taxi.backend.DTO.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DriverSaveDTO {

    private String driverName;
    private String nic;
    private String email;
    private String phoneNumber;
    private String vehicleModel;
    private String vehicleNumber;
    private int capacity;

}
