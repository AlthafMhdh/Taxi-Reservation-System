package com.city.taxi.software.city.taxi.backend.DTO.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OperatorResponseDTO {
    private int operatorId;
    private String operatorName;
    private String nic;
    private String email;
    private String phoneNumber;
    private Date registedDate;
}
