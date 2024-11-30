package org.e2e.passenger.domain;

import org.e2e.auth.utils.AuthorizationUtils;
import org.e2e.coordinate.domain.Coordinate;
import org.e2e.coordinate.infrastructure.CoordinateRepository;
import org.e2e.exceptions.ResourceNotFoundException;
import org.e2e.passenger.dto.*;
import org.e2e.passenger.exceptions.UnauthorizeOperationException;
import org.e2e.passenger.infrastructure.PassengerRepository;
import org.e2e.userLocation.domain.UserLocation;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PassengerService {

    private final PassengerRepository passengerRepository;
    private final ModelMapper modelMapper;
    private final CoordinateRepository coordinateRepository;

    private final AuthorizationUtils authorizationUtils;

    @Autowired
    public PassengerService(PassengerRepository passengerRepository, ModelMapper modelMapper, CoordinateRepository coordinateRepository, AuthorizationUtils authorizationUtils) {
        this.passengerRepository = passengerRepository;
        this.modelMapper = modelMapper;
        this.coordinateRepository = coordinateRepository;
        this.authorizationUtils = authorizationUtils;
    }

    public PassengerSelfResponseDTO getPassengerOwnInfo() {
        String username = authorizationUtils.getCurrentUserEmail();
        if (username == null)
            throw new UnauthorizeOperationException("Anonymous User not allowed to access this resource");

        Passenger passenger = passengerRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Passenger not found"));
        return modelMapper.map(passenger, PassengerSelfResponseDTO.class);

    }

    public PassengerResponseDto getPassengerInfo(Long id) {
        Passenger passenger = passengerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Passenger not found"));
        return modelMapper.map(passenger, PassengerResponseDto.class);
    }

    public void deletePassenger(Long id) {
        if (!authorizationUtils.isAdminOrResourceOwner(id))
            throw new UnauthorizeOperationException("User has no permission to modify this resource");
        passengerRepository.deleteById(id);
    }

    public void addPassengerPlace(NewPassengerLocationDTO passengerLocationResponseDTO) {
        String username = authorizationUtils.getCurrentUserEmail();
        if (username == null)
            throw new UnauthorizeOperationException("Anonymous User not allowed to access this resource");

        Passenger passenger = passengerRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Passenger not found"));

        Double longitude = passengerLocationResponseDTO.getLongitude();
        Double latitude = passengerLocationResponseDTO.getLatitude();

        Coordinate coordinate = new Coordinate(latitude, longitude);
        coordinateRepository.save(coordinate);

        String description = passengerLocationResponseDTO.getDescription();
        passenger.addCoordinate(coordinate, description);

        passengerRepository.save(passenger);
    }

    public List<PassengerLocationResponseDTO> getPassengerPlaces() {
        String username = authorizationUtils.getCurrentUserEmail();
        Passenger passenger = passengerRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Passenger not found"));

        List<UserLocation> userLocations = passenger.getCoordinates();

        return userLocations.stream().map(userLocation -> {
            PassengerLocationResponseDTO passengerLocationResponseDTO = new PassengerLocationResponseDTO();

            passengerLocationResponseDTO.setCoordinateId(userLocation.getId().getCoordinateId());
            passengerLocationResponseDTO.setDescription(userLocation.getDescription());
            passengerLocationResponseDTO.setLatitude(userLocation.getCoordinate().getLatitude());
            passengerLocationResponseDTO.setLongitude(userLocation.getCoordinate().getLongitude());
            return passengerLocationResponseDTO;
        }).toList();
    }

    public void deletePassengerPlace(Long coordinateId) {
        String username = authorizationUtils.getCurrentUserEmail();

        Passenger passenger = passengerRepository
                .findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Passenger not found"));

        Coordinate coordinate = coordinateRepository
                .findById(coordinateId)
                .orElseThrow(() -> new ResourceNotFoundException("Coordinate not found"));

        passenger.removeCoordinate(coordinate);

        coordinateRepository.delete(coordinate);

        passengerRepository.save(passenger);
    }

    public PassengerResponseDto updatePassenger(PassengerPatchRequestDto passengerSelfResponseDto) {
        String username = authorizationUtils.getCurrentUserEmail();
        Passenger passenger = passengerRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Passenger not found"));

        passenger.setFirstName(passengerSelfResponseDto.getFirstName());
        passenger.setLastName(passengerSelfResponseDto.getLastName());
        passenger.setPhoneNumber(passengerSelfResponseDto.getPhoneNumber());

        passengerRepository.save(passenger);

        return modelMapper.map(passenger, PassengerResponseDto.class);
    }
}
