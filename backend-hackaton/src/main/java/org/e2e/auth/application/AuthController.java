package org.e2e.auth.application;

import org.e2e.auth.domain.AuthService;
import org.e2e.auth.dto.AuthResponseDto;
import org.e2e.auth.dto.LoginRequestDto;
import org.e2e.auth.dto.RegisterRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginRequestDto loginRequestDto) {
        System.out.println("Logeado");
        return ResponseEntity.ok(authService.login(loginRequestDto));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(@RequestBody RegisterRequestDto registerRequestDto) {
        return ResponseEntity.ok(authService.register(registerRequestDto));
    }

    @GetMapping("/test/connection")
    public ResponseEntity<String> testConnection() {
        try {
            jdbcTemplate.execute("SELECT 1"); // Execute a simple SQL query to test the connection
            return ResponseEntity.ok("Connection to PostgreSQL database is successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error connecting to PostgreSQL database: " + e.getMessage());
        }
    }
}
