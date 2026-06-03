package com.spring.boot.service.impl;

import com.spring.boot.dto.SensorReadingRequest;
import com.spring.boot.dto.SensorReadingResponse;
import com.spring.boot.enums.SensorType;
import com.spring.boot.mapper.SensorMapper;
import com.spring.boot.model.Sensor;
import com.spring.boot.model.SensorReading;
import com.spring.boot.repo.SensorReadingRepo;
import com.spring.boot.repo.SensorRepo;
import com.spring.boot.service.SensorService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
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

    private final Random random = new Random();

    // Runs automatically every 2 seconds - NO API call needed!
    @Scheduled(fixedRate = 2000)  // 2000 milliseconds = 2 seconds
    @Transactional
    public void autoGenerateFakeData() {
        List<Sensor> sensors = sensorRepo.findAll();


        for (Sensor sensor : sensors) {
            SensorReading reading = new SensorReading();
            reading.setSensor(sensor);
            reading.setValue(generateRandomValue(sensor));
            reading.setTimestamp(LocalDateTime.now());

            readingRepo.save(reading);
        }

    }

    private Double generateRandomValue(Sensor sensor) {
        // Generate different values based on sensor type
        SensorType sensorName = sensor.getType();

        if (sensorName==SensorType.CO2 ) {
            // Temperature: 20-35°C
            return 20 + (random.nextDouble() * 15);
        } else if (sensorName==SensorType.HUMIDITY ) {
            // Humidity: 40-80%
            return 40 + (random.nextDouble() * 40);
        } else if (sensorName==SensorType.RAIN) {
            // Pressure: 980-1050
            return 980 + (random.nextDouble() * 70);
        } else {

            return 1.0;
        }
    }

    // Start generating as soon as the application starts
    @PostConstruct
    public void init() {
        System.out.println("🚀 Auto Fake Data Generator Started - Will generate data every 2 seconds automatically!");
        System.out.println("💡 No API calls needed - runs in background automatically");
    }

    @Override
    public List<SensorReadingResponse> getReadings(Long sensorId) {
        return readingRepo.findBySensorId(sensorId)
                .stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }
}
