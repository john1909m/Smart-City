package com.spring.boot.controller;

import com.spring.boot.dto.RfidLogsRequest;
import com.spring.boot.service.RfidService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/rfid")
@RequiredArgsConstructor
public class RfidController {

    private final RfidService service;

    @PostMapping
    public ResponseEntity<?> addLog(@RequestBody RfidLogsRequest request) {
        return ResponseEntity.ok(service.addLog(request));
    }

    @GetMapping("/{sensorId}")
    public ResponseEntity<?> getLogs(@PathVariable Long sensorId) {
        return ResponseEntity.ok(service.getLogs(sensorId));
    }
}