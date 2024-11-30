package org.e2e.passenger.dto;

import lombok.Data;

@Data
public class NewPassengerLocationDTO {
    private Double latitude;
    private Double longitude;
    private String description;
}
