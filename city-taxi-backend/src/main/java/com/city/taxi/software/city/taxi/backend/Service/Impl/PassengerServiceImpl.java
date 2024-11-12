package com.city.taxi.software.city.taxi.backend.Service.Impl;

import com.city.taxi.software.city.taxi.backend.DTO.request.PassengerSaveDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.PassengerResponseDTO;
import com.city.taxi.software.city.taxi.backend.Entity.Passenger;
import com.city.taxi.software.city.taxi.backend.Repository.PassengerRepo;
import com.city.taxi.software.city.taxi.backend.Service.PassengerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class PassengerServiceImpl implements PassengerService {

    @Autowired
    private PassengerRepo passengerRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String savePassenger(PassengerSaveDTO passengerSaveDTO) {

        Passenger passenger=modelMapper.map(passengerSaveDTO,Passenger.class);
        passenger.setActiveState(true);
        passenger.setRegistrationDate(new Date());



        if (!passengerRepo.existsById(passenger.getPassengerId())){
            passengerRepo.save(passenger);
            return " Registration Success.";

        }
        else{
            throw new DuplicateKeyException("Passenger Already Added.");
        }

    }

    @Override
    public List<PassengerResponseDTO> getAllPassengers() {

        List<Passenger> passengers = passengerRepo.findAll();
        List<PassengerResponseDTO> passengerResponseDTOs = new ArrayList<>();

        for (Passenger passenger : passengers) {
            PassengerResponseDTO passengerResponseDTO = modelMapper.map(passenger, PassengerResponseDTO.class);
            passengerResponseDTOs.add(passengerResponseDTO);
        }

        return passengerResponseDTOs;

    }

    @Override
    public String updatePassenger(PassengerSaveDTO passengerSaveDTO) {

        Passenger passenger=modelMapper.map(passengerSaveDTO,Passenger.class);
        passenger.setActiveState(true);

        if (passengerRepo.existsById(passenger.getPassengerId())){
            passengerRepo.save(passenger);
            String msg = " Your Profile Updated Successfully.";
            return msg;
        }
        else{
            throw new DuplicateKeyException("Item not found.");
        }
    }

    @Override
    public String deletePassenger(int passengerId) {
        if (passengerRepo.existsById(passengerId)){
            passengerRepo.deleteById(passengerId);
            return " Passenger Deleted Successfully.";

        }
        else{
            throw new DuplicateKeyException("Passenger not found.");
        }
    }

    @Override
    public List<PassengerResponseDTO> getAllPassengersByActiveState(boolean activestate) {

        List<Passenger> passengers = passengerRepo.findAllByActiveStateEquals(activestate);
        List<PassengerResponseDTO> passengerDTOList = new ArrayList<>();

        for (Passenger passenger : passengers) {
            PassengerResponseDTO passengerResponseDTO = modelMapper.map(passenger, PassengerResponseDTO.class);
            passengerDTOList.add(passengerResponseDTO);
        }

        return passengerDTOList;
    }

    @Override
    public Passenger getPassengerById(int passengerId) {
        return  passengerRepo.findByPassengerId(passengerId);
    }


    @Override
    public Long passengerCount() {
        return passengerRepo.count();
    }

    @Override
    public List<PassengerResponseDTO> PassengerProfile(int passengerId) {

        Passenger passengers =  passengerRepo.getById(passengerId);
        PassengerResponseDTO passengerResponseDTO = modelMapper.map(passengers, PassengerResponseDTO.class);
        return List.of(passengerResponseDTO);

    }

    @Override
    public Passenger loginCheck(String email, String nic) {
        return passengerRepo.findByEmailAndNic(email, nic);
    }

    @Override
    public boolean isEmailAvailable(String email) {

        return passengerRepo.existsByEmail(email);

    }


}
