package com.spring.boot.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class SensorReadingRequest {
    private Long sensorId;
    private Double value;
}
