package org.e2e.websocket.dto;

import lombok.Data;
import org.e2e.coordinate.dto.CoordinateDto;

@Data
public class UpdateLocationRequestDto {
    private Long driverId;
    private CoordinateDto coordinate;
}
