package org.e2e.websocket;

import org.e2e.auth.utils.AuthorizationUtils;
import org.e2e.driver.domain.DriverService;
import org.e2e.ride.domain.RideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WebSocketsService {

    @Autowired
    private DriverService driverService;

    @Autowired
    private RideService rideService;

    @Autowired
    private AuthorizationUtils authUtils;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

/*
    public void requestRide(CreateRideRequestDto rideRequestMessage) {
        RideCreatedResponseDto newRide = rideService.createRide(rideRequestMessage);

        PendingRideDto pendingRide = new PendingRideDto();
        pendingRide.setRideId(newRide.getId());
        pendingRide.setRideRequest(rideRequestMessage);
        pendingRide.setNearDrivers(new ArrayList<>());

        messagingTemplate.convertAndSend("/topic/ride/" + newRide.getId(), pendingRide);

        List<Driver> nearbyDrivers = driverService.findNearbyDrivers(rideRequestMessage.getOriginCoordinates());
        for (Driver driver : nearbyDrivers) {
            messagingTemplate.convertAndSendToUser(
                    driver.getUsername(),
                    "/queue/rideNotification",
                    new RideNotificationMessage(
                            DriverAnswer.PENDING,
                            driver.getUsername(),
                            newRide.getId(),
                            rideRequestMessage)
            );
        }
    }

*/
}
