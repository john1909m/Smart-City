package com.spring.boot.repo;

import com.spring.boot.model.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SensorRepo extends JpaRepository<Sensor,Long> {
}
