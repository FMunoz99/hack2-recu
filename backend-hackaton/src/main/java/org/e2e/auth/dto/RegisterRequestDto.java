package org.e2e.auth.dto;

import lombok.Data;
import org.e2e.driver.domain.Category;
import org.e2e.vehicle.dto.VehicleResponseDto;

@Data
public class RegisterRequestDto {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private Boolean isDriver = false;
    private Category category;
    private VehicleResponseDto vehicle;
}
