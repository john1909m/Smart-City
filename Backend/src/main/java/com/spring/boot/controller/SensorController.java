package com.spring.boot.controller;

import com.spring.boot.dto.SensorReadingRequest;
import com.spring.boot.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/readings")
public class SensorController {

    @Autowired
    private SensorService service;

    @PostMapping("/add")
    public ResponseEntity<?> addReading(@RequestBody SensorReadingRequest request) {
        return ResponseEntity.ok(service.addReading(request));
    }

    @GetMapping("/{sensorId}")
    public ResponseEntity<?> getReadings(@PathVariable Long sensorId) {
        return ResponseEntity.ok(service.getReadings(sensorId));
    }
}
