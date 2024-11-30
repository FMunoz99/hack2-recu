package org.e2e.websocket.dto;

import lombok.Data;

@Data
public class NewHexAdressResponse {
    private String hexAdress;

    public NewHexAdressResponse(String hexAdress) {
        this.hexAdress = hexAdress;
    }
}
