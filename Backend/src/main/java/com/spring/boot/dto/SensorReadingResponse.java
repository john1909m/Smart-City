package com.spring.boot.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SensorReadingResponse {
    private Long id;
    private Double value;
    private LocalDateTime timestamp;
    private String sensorType;
}
