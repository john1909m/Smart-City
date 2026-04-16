package com.spring.boot.service.impl;

import com.spring.boot.dto.ActuatorRequest;
import com.spring.boot.dto.ActuatorResponse;
import com.spring.boot.mapper.ActuatorMapper;
import com.spring.boot.model.Actuator;
import com.spring.boot.model.ActuatorState;
import com.spring.boot.repo.ActuatorRepo;
import com.spring.boot.repo.ActuatorStateRepo;
import com.spring.boot.service.ActuatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ActuatorServiceImpl implements ActuatorService {

    @Autowired
    private ActuatorRepo actuatorRepo;
    @Autowired private ActuatorStateRepo stateRepo;
    @Autowired private ActuatorMapper mapper;

    @Override
    public ActuatorResponse setState(Long actuatorId, ActuatorRequest request) {

        Actuator actuator = actuatorRepo.findById(actuatorId)
                .orElseThrow(() -> new RuntimeException("Actuator not found"));

        ActuatorState state = new ActuatorState();
        state.setActuator(actuator);
        state.setState(request.getState());
        state.setTimestamp(LocalDateTime.now());

        return mapper.toResponse(stateRepo.save(state));
    }

    @Override
    public List<ActuatorResponse> getStates(Long actuatorId) {
        return stateRepo.findByActuatorId(actuatorId)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }
}
