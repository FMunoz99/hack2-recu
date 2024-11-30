package org.e2e.ride.application;

import org.e2e.ride.domain.RideService;
import org.e2e.ride.dto.CreateRideRequestDto;
import org.e2e.ride.dto.RideAcceptedResponseDto;
import org.e2e.ride.dto.RideByUserDto;
import org.e2e.ride.dto.RideResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ride")
public class RideController {
    private final RideService rideService;

    @Autowired
    public RideController(RideService rideService) {
        this.rideService = rideService;
    }

    @PostMapping("/request")
    public ResponseEntity<RideResponseDto> passengerBookRide(@RequestBody CreateRideRequestDto rideRequest) {
        RideResponseDto response = rideService.createRide(rideRequest);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/assign/{rideId}")
    public ResponseEntity<RideAcceptedResponseDto> driverAssignRide(@PathVariable Long rideId) {
        RideAcceptedResponseDto response = rideService.assignRide(rideId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{rideId}")
    public ResponseEntity<String> cancelRide(@PathVariable Long rideId) {
        rideService.cancelRide(rideId);
        return ResponseEntity.ok("Ride cancelled");
    }

    @PatchMapping("/{rideId}/status")
    public ResponseEntity<RideResponseDto> updateRideStatus(@PathVariable Long rideId, @RequestParam String status) {
        RideResponseDto response = rideService.updateRideStatus(rideId, status);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user")
    public ResponseEntity<Page<RideByUserDto>> getRideByUser(@RequestParam int page, @RequestParam int size) {
        Page<RideByUserDto> response = rideService.getRidesByUser(page, size);
        return ResponseEntity.ok(response);
    }


}
