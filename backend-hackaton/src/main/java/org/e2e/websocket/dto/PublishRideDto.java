package org.e2e.websocket.dto;

import lombok.Data;

@Data
public class PublishRideDto {
    private Long rideId;
    private String hexAddress;
}
