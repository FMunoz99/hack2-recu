package org.e2e.driver.dto;

import lombok.Data;

@Data
public class DriverPatchRequestDto {
    private String firstName;
    private String lastName;
    private String phoneNumber;
}
