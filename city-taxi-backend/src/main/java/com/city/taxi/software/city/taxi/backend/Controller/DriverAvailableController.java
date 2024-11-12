package com.city.taxi.software.city.taxi.backend.Controller;

import com.city.taxi.software.city.taxi.backend.DTO.request.DriverAvailableDTO;
import com.city.taxi.software.city.taxi.backend.DTO.request.DriverNotAvailableDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.DriverAvailableStatusDTO;
import com.city.taxi.software.city.taxi.backend.Service.DriverAvailableService;
import com.city.taxi.software.city.taxi.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1/DriverAvailable")
public class DriverAvailableController {

    @Autowired
    private DriverAvailableService driverAvailableService;

    @PostMapping(path = "/updateState")
    public ResponseEntity<StandardResponse> updateDriverAvailable(@RequestBody DriverAvailableDTO driverAvailableDTO){
        String message =driverAvailableService.updateDriverAvailable(driverAvailableDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"Success",message),
                HttpStatus.CREATED
        );
    }

    @GetMapping(
            path = "/get-all-available-drivers"
    )
    public ResponseEntity<StandardResponse> getAllAvailableDrivers(){

        List<DriverAvailableStatusDTO> allAvailableDrivers = driverAvailableService.getAllAvailableDrivers();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",allAvailableDrivers),
                HttpStatus.OK
        );
    }

    @PutMapping(path = "/notAvailable")
    public ResponseEntity<StandardResponse> updateDriverNotAvailable(@RequestBody DriverNotAvailableDTO driverNotAvailableDTO){
        String message = driverAvailableService.updateDriverNotAvailable(driverNotAvailableDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }


}
