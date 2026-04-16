package com.spring.boot.service.impl;

import com.spring.boot.dto.SensorReadingRequest;
import com.spring.boot.dto.SensorReadingResponse;
import com.spring.boot.mapper.SensorMapper;
import com.spring.boot.model.Sensor;
import com.spring.boot.model.SensorReading;
import com.spring.boot.repo.SensorReadingRepo;
import com.spring.boot.repo.SensorRepo;
import com.spring.boot.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SensorServiceImpl implements SensorService {
    @Autowired
    private SensorRepo sensorRepo;
    @Autowired private SensorReadingRepo readingRepo;
    @Autowired private SensorMapper mapper;

    @Override
    public SensorReadingResponse addReading(SensorReadingRequest request) {

        Sensor sensor = sensorRepo.findById(request.getSensorId())
                .orElseThrow(() -> new RuntimeException("Sensor not found"));

        SensorReading reading = new SensorReading();
        reading.setSensor(sensor);
        reading.setValue(request.getValue());
        reading.setTimestamp(LocalDateTime.now());

        return mapper.toResponse(readingRepo.save(reading));
    }

    @Override
    public List<SensorReadingResponse> getReadings(Long sensorId) {
        return readingRepo.findBySensorId(sensorId)
                .stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }
}
