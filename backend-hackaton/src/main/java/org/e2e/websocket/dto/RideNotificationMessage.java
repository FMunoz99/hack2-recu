package org.e2e.websocket.dto;

import lombok.Data;
import org.e2e.ride.dto.CreateRideRequestDto;
import org.e2e.websocket.DriverAnswer;

@Data
public class RideNotificationMessage {
    private DriverAnswer driverAnswer;
    private String driverUsername;
    private Long rideId;
    private CreateRideRequestDto rideRequest;

    public RideNotificationMessage(DriverAnswer driverAnswer, String driverUsername, Long rideId, CreateRideRequestDto rideRequest) {
        this.driverAnswer = driverAnswer;
        this.driverUsername = driverUsername;
        this.rideId = rideId;
        this.rideRequest = rideRequest;
    }

}
