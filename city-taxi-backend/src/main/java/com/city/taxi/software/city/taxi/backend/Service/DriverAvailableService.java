package com.city.taxi.software.city.taxi.backend.Service;

import com.city.taxi.software.city.taxi.backend.DTO.request.DriverAvailableDTO;
import com.city.taxi.software.city.taxi.backend.DTO.request.DriverNotAvailableDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.DriverAvailableStatusDTO;

import java.util.List;

public interface DriverAvailableService {


    String updateDriverAvailable(DriverAvailableDTO driverAvailableDTO);

    List<DriverAvailableStatusDTO> getAllAvailableDrivers();

    String updateDriverNotAvailable(DriverNotAvailableDTO driverNotAvailableDTO);
}
