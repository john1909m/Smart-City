package com.spring.boot.repo;

import com.spring.boot.model.Actuator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActuatorRepo extends JpaRepository<Actuator,Long> {
}
