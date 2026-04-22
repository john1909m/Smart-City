package com.spring.boot.service.impl;

import com.spring.boot.dto.RfidLogsRequest;
import com.spring.boot.dto.RfidLogsResponse;
import com.spring.boot.mapper.RfidMapper;
import com.spring.boot.model.RfidLog;
import com.spring.boot.model.Sensor;
import com.spring.boot.repo.RfidLogsRepo;
import com.spring.boot.repo.SensorRepo;
import com.spring.boot.service.RfidService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RfidServiceImpl implements RfidService {

    private final RfidLogsRepo repo;
    private final SensorRepo sensorRepo;
    private final RfidMapper mapper;

    @Override
    public RfidLogsResponse addLog(RfidLogsRequest request) {

        Sensor sensor = sensorRepo.findById(request.getSensorId())
                .orElseThrow();

        // 🔥 Logic بسيط (تقدر تطوره)
        String status = request.getCardId().equals("123") ? "ALLOWED" : "DENIED";

        RfidLog log = new RfidLog();
        log.setCardId(request.getCardId());
        log.setStatus(status);
        log.setTimestamp(LocalDateTime.now());
        log.setSensor(sensor);

        return mapper.toResponse(repo.save(log));
    }

    @Override
    public List<RfidLogsResponse> getLogs(Long sensorId) {
        return repo.findBySensorId(sensorId)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }
}