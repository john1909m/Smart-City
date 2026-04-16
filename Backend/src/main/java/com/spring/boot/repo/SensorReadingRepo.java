package com.spring.boot.repo;

import com.spring.boot.model.SensorReading;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SensorReadingRepo extends JpaRepository<SensorReading,Long> {
    List<SensorReading> findBySensorId(Long sensorId);
}
