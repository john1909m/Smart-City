package com.spring.boot.repo;

import com.spring.boot.model.ActuatorState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActuatorStateRepo extends JpaRepository<ActuatorState,Long> {
    List<ActuatorState> findByActuatorId(Long actuatorId);
}
