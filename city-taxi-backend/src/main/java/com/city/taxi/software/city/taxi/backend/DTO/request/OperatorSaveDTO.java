package com.city.taxi.software.city.taxi.backend.DTO.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class OperatorSaveDTO {

    private String operatorName;
    private String nic;
    private String email;
    private String phoneNumber;
}
