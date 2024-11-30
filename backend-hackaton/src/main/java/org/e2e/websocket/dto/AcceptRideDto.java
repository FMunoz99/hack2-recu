package org.e2e.websocket.dto;

import lombok.Data;

@Data
public class AcceptRideDto {
    private Long driverId;
    private Long rideId;
    private String status;
}
