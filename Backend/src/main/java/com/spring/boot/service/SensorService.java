package com.spring.boot.service;

import com.spring.boot.dto.SensorReadingRequest;
import com.spring.boot.dto.SensorReadingResponse;

import java.util.List;

public interface SensorService {
    SensorReadingResponse addReading(SensorReadingRequest request);
    List<SensorReadingResponse> getReadings(Long sensorId);
}
