package com.spring.boot.controller;

import com.spring.boot.dto.ActuatorRequest;
import com.spring.boot.service.ActuatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/actuators")
public class ActuatorController {

    @Autowired
    private ActuatorService service;

    @PostMapping("/update")
    public ResponseEntity<?> setState(@PathVariable Long id,
                                      @RequestBody ActuatorRequest request) {
        return ResponseEntity.ok(service.setState(id, request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getStates(@PathVariable Long id) {
        return ResponseEntity.ok(service.getStates(id));
    }
}