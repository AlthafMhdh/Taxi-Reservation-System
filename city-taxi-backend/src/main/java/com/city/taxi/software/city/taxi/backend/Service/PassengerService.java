package com.city.taxi.software.city.taxi.backend.Service;

import com.city.taxi.software.city.taxi.backend.DTO.request.PassengerSaveDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.PassengerResponseDTO;
import com.city.taxi.software.city.taxi.backend.Entity.Passenger;

import java.util.List;


public interface PassengerService {

    String savePassenger(PassengerSaveDTO passengerSaveDTO);

    List<PassengerResponseDTO> getAllPassengers();

    String updatePassenger(PassengerSaveDTO passengerSaveDTO);

    String deletePassenger(int passengerId);

    List<PassengerResponseDTO> getAllPassengersByActiveState(boolean activestate);


    Passenger getPassengerById(int passengerId);


    Long passengerCount();

    List<PassengerResponseDTO> PassengerProfile(int passengerId);

    Passenger loginCheck(String email, String nic);

    boolean isEmailAvailable(String email);
}
