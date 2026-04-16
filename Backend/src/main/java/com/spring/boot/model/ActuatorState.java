package com.spring.boot.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Data
@Setter
public class ActuatorState {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String state; // ON / OFF

    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "actuator_id")
    private Actuator actuator;
}