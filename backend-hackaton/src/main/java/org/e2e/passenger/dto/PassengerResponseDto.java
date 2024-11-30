package org.e2e.passenger.dto;

import lombok.Data;

@Data
public class PassengerResponseDto {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private Float avgRating;
}
