package org.e2e.passenger.dto;

import lombok.Data;

@Data
public class PassengerPatchRequestDto {
    private String firstName;
    private String lastName;
    private String phoneNumber;
}
