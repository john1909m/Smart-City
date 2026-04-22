package com.spring.boot.service;

import com.spring.boot.dto.RfidLogsRequest;
import com.spring.boot.dto.RfidLogsResponse;

import java.util.List;

public interface RfidService {
    RfidLogsResponse addLog(RfidLogsRequest request);
    List<RfidLogsResponse> getLogs(Long sensorId);
}
