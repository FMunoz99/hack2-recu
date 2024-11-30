package org.e2e.ride.dto;

import lombok.Data;

@Data
public class RideResponseDto {
    private Long id;
    private String originName;
    private String destinationName;
    private String hexAddress;
    private String status;
}
