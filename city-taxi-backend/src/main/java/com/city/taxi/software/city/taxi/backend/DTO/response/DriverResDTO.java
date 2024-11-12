package com.city.taxi.software.city.taxi.backend.DTO.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DriverResDTO {

    private String driverId;
    private String driverName;
    private String NIC;
    private String email;
    private String phoneNumber;
    private String vehicleModel;
    private String vehicleNumber;
    private Date registrationDate;
    private String averageRating;

}
