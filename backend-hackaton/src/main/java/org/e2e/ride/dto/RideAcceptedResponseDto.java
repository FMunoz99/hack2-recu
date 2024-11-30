package org.e2e.ride.dto;

import lombok.Data;
import org.e2e.coordinate.domain.Coordinate;
import org.e2e.driver.dto.DriverResponseDto;
import org.e2e.passenger.dto.PassengerResponseDto;

@Data
public class RideAcceptedResponseDto {
    private String originName;
    private String destinationName;
    private Coordinate originCoordinates;
    private Coordinate destinationCoordinates;
    private String status;
    private PassengerResponseDto passenger;
    private DriverResponseDto driver;

}
