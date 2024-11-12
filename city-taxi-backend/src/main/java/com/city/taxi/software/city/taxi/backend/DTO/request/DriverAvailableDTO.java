package com.city.taxi.software.city.taxi.backend.DTO.request;

import com.city.taxi.software.city.taxi.backend.Entity.Driver;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DriverAvailableDTO {

    private Driver driver;
    private String curentLocation;
}
