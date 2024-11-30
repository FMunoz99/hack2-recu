package org.e2e.auth.domain;

import org.e2e.auth.dto.AuthResponseDto;
import org.e2e.auth.dto.LoginRequestDto;
import org.e2e.auth.dto.RegisterRequestDto;
import org.e2e.auth.exceptions.UserAlreadyExistException;
import org.e2e.config.JwtService;

import org.e2e.user.domain.Role;
import org.e2e.user.domain.User;
import org.e2e.user.infrastructure.BaseUserRepository;

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

        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Email is not registered"));

        // Valida la contraseña
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Password is incorrect");
        }

        // Genera el token y devuelve la respuesta
        AuthResponseDto response = new AuthResponseDto();
        response.setToken(jwtService.generateToken(user));
        return response;
    }
    public AuthResponseDto register(RegisterRequestDto registerRequestDto) {
        // Verifica si el usuario ya existe
        if (userRepository.findByEmail(registerRequestDto.getEmail()).isPresent()) {
            throw new UserAlreadyExistException("User already exists with this email");
        }

        // Mapea el DTO al objeto de dominio `User`
        User user = modelMapper.map(registerRequestDto, User.class);
        user.setPassword(passwordEncoder.encode(registerRequestDto.getPassword())); // Cifra la contraseña
        user.setRole(Role.USER); // Asigna un rol por defecto
        user.setCreatedAt(ZonedDateTime.now()); // Fecha de creación

        // Guarda el usuario en la base de datos
        userRepository.save(user);

        // Genera el token y devuelve la respuesta
        AuthResponseDto response = new AuthResponseDto();
        response.setToken(jwtService.generateToken(user));
        return response;
    }
}
