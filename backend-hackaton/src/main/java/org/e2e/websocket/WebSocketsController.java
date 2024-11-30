package org.e2e.websocket;


import org.e2e.driver.domain.DriverService;
import org.e2e.ride.dto.RideResponseDto;
import org.e2e.websocket.dto.AcceptRideDto;
import org.e2e.websocket.dto.NewHexAdressResponse;
import org.e2e.websocket.dto.UpdateLocationRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.io.IOException;
import java.security.Principal;

@Controller
public class WebSocketsController {

    @Autowired
    private DriverService driverService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/update-position")
    @SendTo("/topic/position")
    public NewHexAdressResponse updatePosition(
            @Payload UpdateLocationRequestDto position,
            Principal principal) throws IOException {
        String newHexAddress = driverService.updatePosition(principal.getName(), position);
        return new NewHexAdressResponse(newHexAddress);
    }

    @MessageMapping("/publish-ride")
    public void searchDriver(
            @Payload RideResponseDto ride,
            Principal principal) throws IOException {

        messagingTemplate.convertAndSend("/topic/ride/" + ride.getHexAddress()  , ride);

    }

    @MessageMapping("/assign-ride/{rideId}")
    public void assignRide(
            @Payload AcceptRideDto ride,
            @DestinationVariable String  rideId,
            Principal principal) {
        String driverUsername = principal.getName();

    }
}
