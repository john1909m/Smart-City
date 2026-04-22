package com.spring.boot.repo;

import com.spring.boot.model.RfidLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RfidLogsRepo extends JpaRepository<RfidLog,Long> {
    List<RfidLog> findBySensorId(Long sensorId);
}
