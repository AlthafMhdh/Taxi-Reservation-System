package com.city.taxi.software.city.taxi.backend.Service;

import com.city.taxi.software.city.taxi.backend.DTO.request.DriverSaveDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.DriverResDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.DriverResponseDTO;
import com.city.taxi.software.city.taxi.backend.Entity.Driver;

import java.util.List;

public interface DriverService {

    String saveDriver(DriverSaveDTO driverSaveDTO);

    List<DriverResponseDTO> getAllDrivers();

    String updateDriver(DriverSaveDTO driverSaveDTO);

    String deleteDriver(int driverId);

    List<DriverResponseDTO> getAllDriversByActiveState(boolean activestate);

    Driver getDriverById(int driverId);

    Long driverCount();

    List<DriverResponseDTO> DriverProfile(int driverId);

    Driver loginCheck(String email, String nic);

    boolean isEmailAvailable(String email);

    List<DriverResDTO> getAllDriversAdmin();
}
