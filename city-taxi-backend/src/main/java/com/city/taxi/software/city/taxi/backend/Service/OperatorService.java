package com.city.taxi.software.city.taxi.backend.Service;

import com.city.taxi.software.city.taxi.backend.DTO.request.OperatorSaveDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.OperatorResponseDTO;
import com.city.taxi.software.city.taxi.backend.Entity.Operator;

import java.util.List;

public interface OperatorService {

    String saveOperator(OperatorSaveDTO operatorSaveDTO);

    List<OperatorResponseDTO> getAllOperatorsByActiveState();

    List<OperatorResponseDTO> getAllSuspendOperator();

    Long operatorCount();

    Operator loginCheck(String email, String nic);

    boolean isEmailAvailable(String email);

    List<OperatorResponseDTO> OperatorProfile(int operatorId);
}
