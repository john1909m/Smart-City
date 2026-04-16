package com.spring.boot.service;

import com.spring.boot.dto.ActuatorRequest;
import com.spring.boot.dto.ActuatorResponse;

import java.util.List;

public interface ActuatorService {
    ActuatorResponse setState(Long actuatorId, ActuatorRequest request);
    List<ActuatorResponse> getStates(Long actuatorId);
}
