package com.city.taxi.software.city.taxi.backend.Service.Impl;

import com.city.taxi.software.city.taxi.backend.DTO.request.OperatorSaveDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.OperatorResponseDTO;
import com.city.taxi.software.city.taxi.backend.Entity.Operator;
import com.city.taxi.software.city.taxi.backend.Repository.OperatorRepo;
import com.city.taxi.software.city.taxi.backend.Service.OperatorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OperatorServiceImpl implements OperatorService {

    @Autowired
    private OperatorRepo operatorRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String saveOperator(OperatorSaveDTO operatorSaveDTO) {
        Operator operator =modelMapper.map(operatorSaveDTO,Operator.class);
        operator.setActiveState(true);
        operator.setRegistedDate(new Date());


        if (!operatorRepo.existsById(operator.getOperatorId())){
            operatorRepo.save(operator);
            return "Operator Registered Successfully.";

        }
        else{
            throw new DuplicateKeyException("Something went wrong.");
        }
    }

    @Override
    public List<OperatorResponseDTO> getAllOperatorsByActiveState() {
        boolean b= true;
        List<Operator> operators = operatorRepo.findAllByActiveStateEquals(b);
        List<OperatorResponseDTO> operatorDTOList = new ArrayList<>();

        for (Operator operator : operators) {
            OperatorResponseDTO operatorResponseDTO = modelMapper.map(operator, OperatorResponseDTO.class);
            operatorDTOList.add(operatorResponseDTO);
        }

        return operatorDTOList;
    }

    @Override
    public List<OperatorResponseDTO> getAllSuspendOperator() {
        boolean b= false;
        List<Operator> operators = operatorRepo.findAllByActiveStateEquals(b);
        List<OperatorResponseDTO> operatorDTOList = new ArrayList<>();

        for (Operator operator : operators) {
            OperatorResponseDTO operatorResponseDTO = modelMapper.map(operator, OperatorResponseDTO.class);
            operatorDTOList.add(operatorResponseDTO);
        }

        return operatorDTOList;
    }

    @Override
    public Long operatorCount() {
        return operatorRepo.count();
    }

    @Override
    public Operator loginCheck(String email, String nic) {
        return operatorRepo.findByEmailAndNic(email, nic);
    }

    @Override
    public boolean isEmailAvailable(String email) {
        return operatorRepo.existsByEmail(email);
    }

    @Override
    public List<OperatorResponseDTO> OperatorProfile(int operatorId) {
        Operator operator =  operatorRepo.getById(operatorId);
        OperatorResponseDTO operatorResponseDTO = modelMapper.map(operator, OperatorResponseDTO.class);
        return List.of(operatorResponseDTO);
    }
}
