package org.e2e.auth.domain;

import org.e2e.auth.dto.AuthResponseDto;
import org.e2e.auth.dto.LoginRequestDto;
import org.e2e.auth.dto.RegisterRequestDto;
import org.e2e.auth.exceptions.UserAlreadyExistException;
import org.e2e.config.JwtService;
import org.e2e.driver.domain.Driver;
import org.e2e.passenger.domain.Passenger;
import org.e2e.user.domain.Role;
import org.e2e.user.domain.User;
import org.e2e.user.infrastructure.BaseUserRepository;
import org.e2e.vehicle.domain.Vehicle;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.Optional;

@Service
public class AuthService {

    private final BaseUserRepository<User> userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    @Autowired
    public AuthService(BaseUserRepository<User> userRepository, JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = new ModelMapper();
    }

    public AuthResponseDto login(LoginRequestDto req) {
        Optional<User> user;
        user = userRepository.findByEmail(req.getEmail());

        if (user.isEmpty()) throw new UsernameNotFoundException("Email is not registered");

        if (!passwordEncoder.matches(req.getPassword(), user.get().getPassword()))
            throw new IllegalArgumentException("Password is incorrect");

        AuthResponseDto response = new AuthResponseDto();

        response.setToken(jwtService.generateToken(user.get()));
        return response;
    }

    public AuthResponseDto register(RegisterRequestDto registerRequestDto) {
        Optional<User> user = userRepository.findByEmail(registerRequestDto.getEmail());
        if (user.isPresent()) throw new UserAlreadyExistException("Email is already registered");

        if (registerRequestDto.getIsDriver()) {
            Driver driver = new Driver();
            driver.setCategory(registerRequestDto.getCategory());
            driver.setVehicle(modelMapper.map(registerRequestDto.getVehicle(), Vehicle.class));
            driver.setTrips(0);
            driver.setAvgRating(0f);
            driver.setCreatedAt(ZonedDateTime.now());
            driver.setRole(Role.DRIVER);
            driver.setFirstName(registerRequestDto.getFirstName());
            driver.setLastName(registerRequestDto.getLastName());
            driver.setEmail(registerRequestDto.getEmail());
            driver.setPassword(passwordEncoder.encode(registerRequestDto.getPassword()));
            driver.setPhoneNumber(registerRequestDto.getPhone());

            userRepository.save(driver);

            AuthResponseDto response = new AuthResponseDto();
            response.setToken(jwtService.generateToken(driver));
            return response;
        } else {
            Passenger passenger = new Passenger();
            passenger.setCreatedAt(ZonedDateTime.now());
            passenger.setRole(Role.PASSENGER);
            passenger.setFirstName(registerRequestDto.getFirstName());
            passenger.setLastName(registerRequestDto.getLastName());
            passenger.setEmail(registerRequestDto.getEmail());
            passenger.setPassword(passwordEncoder.encode(registerRequestDto.getPassword()));
            passenger.setPhoneNumber(registerRequestDto.getPhone());
            passenger.setAvgRating(0f);
            passenger.setTrips(0);

            userRepository.save(passenger);

            AuthResponseDto response = new AuthResponseDto();
            response.setToken(jwtService.generateToken(passenger));
            return response;
        }

    }
}
