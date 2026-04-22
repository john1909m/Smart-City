package com.spring.boot.dto;

import lombok.Data;

@Data
public class RfidLogsRequest {
    private Long sensorId;
    private String cardId;
}
