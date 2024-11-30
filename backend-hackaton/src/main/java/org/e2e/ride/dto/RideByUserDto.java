package org.e2e.ride.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RideByUserDto {
    private String originName;
    private String destinationName;
    private Double price;
    private LocalDateTime departureDate;
}
