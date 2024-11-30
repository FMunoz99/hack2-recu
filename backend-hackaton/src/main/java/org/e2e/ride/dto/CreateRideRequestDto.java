package org.e2e.ride.dto;

import lombok.Data;
import org.e2e.coordinate.domain.Coordinate;

@Data
public class CreateRideRequestDto {
    private String originName;
    private String destinationName;
    private Double price;
    private Coordinate originCoordinates;
    private Coordinate destinationCoordinates;
}
