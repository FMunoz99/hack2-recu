package org.e2e.vehicle.dto;

import lombok.Data;

@Data
public class VehicleResponseDto {
    private String brand;
    private String model;
    private String licensePlate;
    private Integer fabricationYear;
    private Integer capacity;
}
