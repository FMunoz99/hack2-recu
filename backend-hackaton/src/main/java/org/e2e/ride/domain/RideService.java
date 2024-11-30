package org.e2e.ride.domain;

import com.uber.h3core.H3Core;
import org.e2e.auth.utils.AuthorizationUtils;
import org.e2e.driver.domain.Driver;
import org.e2e.driver.dto.DriverResponseDto;
import org.e2e.driver.infrastructure.DriverRepository;
import org.e2e.exceptions.ResourceNotFoundException;
import org.e2e.passenger.domain.Passenger;
import org.e2e.passenger.dto.PassengerResponseDto;
import org.e2e.passenger.infrastructure.PassengerRepository;
import org.e2e.ride.dto.CreateRideRequestDto;
import org.e2e.ride.dto.RideAcceptedResponseDto;
import org.e2e.ride.dto.RideByUserDto;
import org.e2e.ride.dto.RideResponseDto;
import org.e2e.ride.infrastructure.RideRepository;
import org.e2e.vehicle.dto.VehicleResponseDto;
import org.e2e.websocket.dto.AcceptRideDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class RideService {

    private final RideRepository rideRepository;
    private final PassengerRepository passengerRepository;
    private final DriverRepository driverRepository;
    private final SimpMessagingTemplate messagingTemplate;

    private final AuthorizationUtils authorizationUtils;
    private final ModelMapper modelMapper = new ModelMapper();

    @Autowired
    public RideService(RideRepository rideRepository, PassengerRepository passengerRepository, DriverRepository driverRepository, SimpMessagingTemplate messagingTemplate, AuthorizationUtils authorizationUtils) {
        this.rideRepository = rideRepository;
        this.passengerRepository = passengerRepository;
        this.driverRepository = driverRepository;
        this.messagingTemplate = messagingTemplate;
        this.authorizationUtils = authorizationUtils;
    }

    public RideResponseDto createRide(CreateRideRequestDto rideRequest) {
        String userEmail = authorizationUtils.getCurrentUserEmail();
        Passenger ridePassenger = passengerRepository
                .findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Passenger not found"));

        Ride ride = new Ride();
        ride.setOriginName(rideRequest.getOriginName());
        ride.setDestinationName(rideRequest.getDestinationName());
        ride.setPrice(rideRequest.getPrice());
        ride.setOriginCoordinates(rideRequest.getOriginCoordinates());
        ride.setDestinationCoordinates(rideRequest.getDestinationCoordinates());
        ride.setStatus(Status.valueOf("REQUESTED"));
        ride.setPassenger(ridePassenger);

        rideRepository.save(ride);

        H3Core h3;
        try {
            h3 = H3Core.newInstance();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String newHexAddress = h3.latLngToCellAddress(
                ride.getOriginCoordinates().getLatitude(),
                ride.getOriginCoordinates().getLongitude(),
                10);

        RideResponseDto response = new RideResponseDto();
        response.setId(ride.getId());
        response.setOriginName(ride.getOriginName());
        response.setDestinationName(ride.getDestinationName());
        response.setHexAddress(newHexAddress);
        response.setStatus(Status.REQUESTED.name());

        return response;
    }

    public RideAcceptedResponseDto assignRide(Long rideId) {
        String userEmail = authorizationUtils.getCurrentUserEmail();
        Driver driver = driverRepository
                .findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Driver not found"));

        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new ResourceNotFoundException("Ride not found"));

        if (!ride.getStatus().equals(Status.REQUESTED)) {
            throw new IllegalArgumentException("Ride is not available for assignment");
        }

        ride.setDriver(driver);
        ride.setStatus(Status.ACCEPTED);
        ride.setDepartureDate(LocalDateTime.now());

        rideRepository.save(ride);

        RideAcceptedResponseDto response = modelMapper.map(ride, RideAcceptedResponseDto.class);
        response.setOriginName(ride.getOriginName());
        response.setDestinationName(ride.getDestinationName());
        response.setOriginCoordinates(ride.getOriginCoordinates());
        response.setDestinationCoordinates(ride.getDestinationCoordinates());
        response.setStatus(Status.ACCEPTED.name());

        VehicleResponseDto vehicle = modelMapper.map(driver.getVehicle(), VehicleResponseDto.class);
        response.setDriver(modelMapper.map(driver, DriverResponseDto.class));
        response.getDriver().setVehicle(vehicle);

        response.setPassenger(modelMapper.map(ride.getPassenger(), PassengerResponseDto.class));

        AcceptRideDto acceptRideDto = new AcceptRideDto();
        acceptRideDto.setRideId(ride.getId());
        acceptRideDto.setDriverId(driver.getId());
        acceptRideDto.setStatus(Status.ACCEPTED.name());

        H3Core h3;
        try {
            h3 = H3Core.newInstance();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String hexAddress = h3.latLngToCellAddress(
                ride.getOriginCoordinates().getLatitude(),
                ride.getOriginCoordinates().getLongitude(),
                10);

        messagingTemplate.convertAndSend("/topic/ride/" + hexAddress, acceptRideDto);
        messagingTemplate.convertAndSendToUser(ride.getPassenger().getEmail(), "/queue/assign_ride/" + ride.getId(), response);

        return response;
    }

    public RideResponseDto updateRideStatus(Long rideId, String status) {
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new IllegalArgumentException("Ride not found"));

        ride.setStatus(Status.valueOf(status));
        rideRepository.save(ride);

        return modelMapper.map(ride, RideResponseDto.class);
    }

    public void cancelRide(Long rideId) {
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new IllegalArgumentException("Ride not found"));

        if (!List.of("IN_PROGRESS", "COMPLETED").contains(ride.getStatus().name())) {
            throw new IllegalArgumentException("Ride is not available for cancellation");
        }

        ride.setStatus(Status.CANCELLED);
        rideRepository.save(ride);
    }

    public Page<RideByUserDto> getRidesByUser(int page, int size) {
        String userEmail = authorizationUtils.getCurrentUserEmail();
        Passenger passenger = passengerRepository
                .findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Passenger not found"));
        Pageable pageable = PageRequest.of(page, size);

        Page<Ride> rides = rideRepository.findAllByPassengerIdAndStatus(passenger.getId(), Status.COMPLETED, pageable);
        return rides.map(ride -> modelMapper.map(ride, RideByUserDto.class));
    }
}
