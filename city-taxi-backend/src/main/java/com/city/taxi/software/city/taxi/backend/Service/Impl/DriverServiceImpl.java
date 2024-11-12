package com.city.taxi.software.city.taxi.backend.Service.Impl;

import com.city.taxi.software.city.taxi.backend.DTO.QueryInterface.DriverDetails;
import com.city.taxi.software.city.taxi.backend.DTO.request.DriverSaveDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.DriverResDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.DriverResponseDTO;
import com.city.taxi.software.city.taxi.backend.Entity.Driver;
import com.city.taxi.software.city.taxi.backend.Repository.DriverRepo;
import com.city.taxi.software.city.taxi.backend.Service.DriverService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class DriverServiceImpl implements DriverService {

    @Autowired
    private DriverRepo driverRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String saveDriver(DriverSaveDTO driverSaveDTO) {
        Driver driver =modelMapper.map(driverSaveDTO,Driver.class);
        driver.setActiveState(true);
        driver.setRegistrationDate(new Date());

        if (!driverRepo.existsById(driver.getDriverId())){
            driverRepo.save(driver);
            return " Driver Added Successfully.";

        }
        else{
            throw new DuplicateKeyException("Driver Already Added.");
        }
    }

    @Override
    public List<DriverResponseDTO> getAllDrivers() {
        List<Driver> drivers = driverRepo.findAll();
        List<DriverResponseDTO> driverResponseDTOs = new ArrayList<>();

        for (Driver driver : drivers) {
            DriverResponseDTO driverResponseDTO = modelMapper.map(driver, DriverResponseDTO.class);
            driverResponseDTOs.add(driverResponseDTO);
        }

        return driverResponseDTOs;
    }


    @Override
    public List<DriverResDTO> getAllDriversAdmin() {

        boolean b= true;

        List<DriverDetails> drivers = driverRepo.AllDrivers(b);

        List<DriverResDTO> driverList = new ArrayList<>();

        for (DriverDetails d : drivers) {
            DriverResDTO n = new DriverResDTO(
                    d.getDriverId(),
                    d.getDriverName(),
                    d.getNIC(),
                    d.getEmail(),
                    d.getPhoneNumber(),
                    d.getVehicleModel(),
                    d.getVehicleNumber(),
                    d.getRegistrationDate(),
                    d.getAverageRating()

            );
            driverList.add(n);
        }

        return driverList;
    }

    @Override
    public String updateDriver(DriverSaveDTO driverSaveDTO) {
        Driver driver=modelMapper.map(driverSaveDTO,Driver.class);
        driver.setActiveState(true);

        if (driverRepo.existsById(driver.getDriverId())){
            driverRepo.save(driver);
            return " Driver Updated Successfully.";

        }
        else{
            throw new DuplicateKeyException("Driver not found.");
        }
    }

    @Override
    public String deleteDriver(int driverId) {
        if (driverRepo.existsById(driverId)){
            driverRepo.deleteById(driverId);
            return " Driver Deleted Successfully.";

        }
        else{
            throw new DuplicateKeyException("Driver not found.");
        }
    }

    @Override
    public List<DriverResponseDTO> getAllDriversByActiveState(boolean activestate) {
        List<Driver> drivers = driverRepo.findAllByActiveStateEquals(activestate);
        List<DriverResponseDTO> driverDTOList = new ArrayList<>();

        for (Driver driver : drivers) {
            DriverResponseDTO driverResponseDTO = modelMapper.map(driver, DriverResponseDTO.class);
            driverDTOList.add(driverResponseDTO);
        }

        return driverDTOList;
    }

    @Override
    public Driver getDriverById(int driverId) {
        return (Driver) driverRepo.findByDriverId(driverId);
    }

    @Override
    public Long driverCount() {

        return driverRepo.count();
    }

    @Override
    public List<DriverResponseDTO> DriverProfile(int driverId) {
        Driver drivers =  driverRepo.getById(driverId);
        DriverResponseDTO driverResponseDTO = modelMapper.map(drivers, DriverResponseDTO.class);
        return List.of(driverResponseDTO);
    }

    @Override
    public Driver loginCheck(String email, String nic) {
        return driverRepo.findByEmailAndNic(email, nic);
    }

    @Override
    public boolean isEmailAvailable(String email) {
        return driverRepo.existsByEmail(email);
    }

}
