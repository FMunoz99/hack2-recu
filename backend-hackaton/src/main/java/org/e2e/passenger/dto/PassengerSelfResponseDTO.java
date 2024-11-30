package org.e2e.passenger.dto;

import lombok.Data;

@Data
public class PassengerSelfResponseDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private Integer trips;
    private Float avgRating;
}
