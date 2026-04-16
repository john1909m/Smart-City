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
public class SensorReading {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double value;

    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "sensor_id")
    private Sensor sensor;
}
