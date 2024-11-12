package com.city.taxi.software.city.taxi.backend.Service.Impl;

import com.city.taxi.software.city.taxi.backend.DTO.request.DriverAvailableDTO;
import com.city.taxi.software.city.taxi.backend.DTO.request.DriverNotAvailableDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.DriverAvailableStatusDTO;
import com.city.taxi.software.city.taxi.backend.Entity.DriverAvailable;
import com.city.taxi.software.city.taxi.backend.Repository.DriverAvailableRepo;
import com.city.taxi.software.city.taxi.backend.Service.DriverAvailableService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DriverAvailableServiceImpl implements DriverAvailableService {

    @Autowired
    private DriverAvailableRepo driverAvailableRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String updateDriverAvailable(DriverAvailableDTO driverAvailableDTO) {
        DriverAvailable driverAvailable =modelMapper.map(driverAvailableDTO,DriverAvailable.class);
        driverAvailable.setActiveState(true);

        if (!driverAvailableRepo.existsById(driverAvailable.getDriverAvailableId())){
            driverAvailableRepo.save(driverAvailable);
            return " Driver Now Available.";
        }
        else{
            throw new DuplicateKeyException("Driver Not Allowed.");
        }
    }

    @Override
    public List<DriverAvailableStatusDTO> getAllAvailableDrivers() {
        boolean b= true;
        List<DriverAvailable> availableDrivers= driverAvailableRepo.findAllByActiveStateEquals(b);
        List<DriverAvailableStatusDTO> availableDriverDTOList = new ArrayList<>();

        for (DriverAvailable driverAvailable : availableDrivers) {

            DriverAvailableStatusDTO driverAvailableStatusDTO = modelMapper.map(driverAvailable, DriverAvailableStatusDTO.class);
            availableDriverDTOList.add(driverAvailableStatusDTO);
        }

        return availableDriverDTOList;
    }

    @Override
    public String updateDriverNotAvailable(DriverNotAvailableDTO driverNotAvailableDTO) {

        DriverAvailable driverAvailable =modelMapper.map(driverNotAvailableDTO,DriverAvailable.class);
        driverAvailable.setActiveState(false);

        if (!driverAvailableRepo.existsById(driverAvailable.getDriverAvailableId())){
            driverAvailableRepo.save(driverAvailable);
            return " Driver Now NotAvailable.";
        }
        else{
            throw new DuplicateKeyException("Driver Not Allowed.");
        }

    }


}
