package org.e2e.passenger.application;

import org.e2e.passenger.domain.PassengerService;
import org.e2e.passenger.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/passenger")
public class PassengerController {

    private final PassengerService passengerService;

    @Autowired
    public PassengerController(PassengerService passengerService) {
        this.passengerService = passengerService;
    }


    @GetMapping("/me")
    public ResponseEntity<PassengerSelfResponseDTO> getPassenger() {
        return ResponseEntity.ok(passengerService.getPassengerOwnInfo());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PassengerResponseDto> getPassenger(@PathVariable Long id) {
        return ResponseEntity.ok(passengerService.getPassengerInfo(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePassenger(@PathVariable Long id) {
        passengerService.deletePassenger(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/me")
    public ResponseEntity<PassengerResponseDto> updatePassenger(@RequestBody PassengerPatchRequestDto passengerSelfResponseDTO) {
        return ResponseEntity.ok().body(passengerService.updatePassenger(passengerSelfResponseDTO));
    }

    @PostMapping("/places")
    public ResponseEntity<Void> addPassengerPlace(@RequestBody NewPassengerLocationDTO passengerLocationResponseDTO) {
        passengerService.addPassengerPlace(passengerLocationResponseDTO);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/places")
    public ResponseEntity<List<PassengerLocationResponseDTO>> getPassengerPlaces() {
        return ResponseEntity.ok(passengerService.getPassengerPlaces());
    }

    @DeleteMapping("/places/{coordinateId}")
    public ResponseEntity<Void> deletePassengerPlace(@PathVariable Long coordinateId) {
        passengerService.deletePassengerPlace(coordinateId);
        return ResponseEntity.noContent().build();
    }


}
