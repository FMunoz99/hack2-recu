package org.e2e.driver.domain;


import com.uber.h3core.H3Core;
import org.e2e.auth.utils.AuthorizationUtils;
import org.e2e.coordinate.domain.Coordinate;
import org.e2e.coordinate.infrastructure.CoordinateRepository;
import org.e2e.driver.dto.DriverPatchRequestDto;
import org.e2e.driver.dto.DriverResponseDto;
import org.e2e.driver.infrastructure.DriverRepository;
import org.e2e.exceptions.ResourceNotFoundException;
import org.e2e.passenger.exceptions.UnauthorizeOperationException;
import org.e2e.vehicle.domain.Vehicle;
import org.e2e.vehicle.domain.VehicleService;
import org.e2e.vehicle.dto.VehicleResponseDto;
import org.e2e.websocket.dto.UpdateLocationRequestDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class DriverService {
    private final DriverRepository driverRepository;
    private final CoordinateRepository coordinateRepository;
    private final VehicleService vehicleService;
    private final AuthorizationUtils authorizationUtils;
    private final ModelMapper modelMapper = new ModelMapper();

    @Autowired
    public DriverService(DriverRepository driverRepository, CoordinateRepository coordinateRepository, VehicleService vehicleService, AuthorizationUtils authorizationUtils) {
        this.driverRepository = driverRepository;
        this.coordinateRepository = coordinateRepository;
        this.vehicleService = vehicleService;
        this.authorizationUtils = authorizationUtils;
    }

    public DriverResponseDto getDriverInfo(Long id) {
        Driver driver = driverRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found"));

        DriverResponseDto response = new DriverResponseDto();
        response.setId(driver.getId());
        response.setFirstName(driver.getFirstName());
        response.setLastName(driver.getLastName());
        response.setEmail(driver.getEmail());
        response.setPhoneNumber(driver.getPhoneNumber());
        response.setCategory(driver.getCategory());
        response.setTrips(driver.getTrips());
        response.setAvgRating(driver.getAvgRating());

        Vehicle vehicle = driver.getVehicle();

        VehicleResponseDto vehicleDto = new VehicleResponseDto();
        vehicleDto.setBrand(vehicle.getBrand());
        vehicleDto.setModel(vehicle.getModel());
        vehicleDto.setLicensePlate(vehicle.getLicensePlate());
        vehicleDto.setFabricationYear(vehicle.getFabricationYear());
        vehicleDto.setCapacity(vehicle.getCapacity());

        response.setVehicle(vehicleDto);

        return response;
    }

    public DriverResponseDto getDriverOwnInfo() {
        String username = authorizationUtils.getCurrentUserEmail();
        if (username == null)
            throw new UnauthorizeOperationException("Anonymous User not allowed to access this resource");

        Driver driver = driverRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Driver not found"));
        return getDriverInfo(driver.getId());

    }

    public void deleteDriver(Long id) {
        if (!authorizationUtils.isAdminOrResourceOwner(id))
            throw new UnauthorizeOperationException("User has no permission to modify this resource");

        driverRepository.deleteById(id);
    }

    public DriverResponseDto updateDriverInfo(Long id, DriverPatchRequestDto driverInfo) {
        if (!authorizationUtils.isAdminOrResourceOwner(id))
            throw new UnauthorizeOperationException("User has no permission to modify this resource");

        Driver driver = driverRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found"));

        driver.setFirstName(driverInfo.getFirstName());
        driver.setLastName(driverInfo.getLastName());
        driver.setPhoneNumber(driverInfo.getPhoneNumber());

        driverRepository.save(driver);

        return modelMapper.map(driver, DriverResponseDto.class);
    }

    public void updateDriverCar(Long id, VehicleResponseDto newVehicle) {
        if (!authorizationUtils.isAdminOrResourceOwner(id))
            throw new UnauthorizeOperationException("User has no permission to modify this resource");

        Driver driver = driverRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found"));

        Long vehicleId = driver.getVehicle().getId();
        Vehicle vehicle = vehicleService.getVehicle(vehicleId);

        vehicle.setBrand(newVehicle.getBrand());
        vehicle.setModel(newVehicle.getModel());
        vehicle.setLicensePlate(newVehicle.getLicensePlate());
        vehicle.setFabricationYear(newVehicle.getFabricationYear());
        vehicle.setCapacity(newVehicle.getCapacity());

        vehicleService.saveVehicle(vehicle);
    }

    public String updatePosition(String username, UpdateLocationRequestDto newLocation) throws IOException {
        Driver driver = driverRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Driver not found"));

        Double latitude = newLocation.getCoordinate().getLatitude();
        Double longitude = newLocation.getCoordinate().getLongitude();

        H3Core h3 = H3Core.newInstance();
        String newHexAdress = h3.latLngToCellAddress(latitude, longitude, 10);

        driver.setHexAdress(newHexAdress);
        driverRepository.save(driver);

        return newHexAdress;
    }

    public List<Driver> findNearbyDrivers(Coordinate location) {
//        return driverRepository.findNearbyDrivers(location);
        return new ArrayList<>();
    }
}
