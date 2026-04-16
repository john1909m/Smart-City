package com.spring.boot.model;

import com.spring.boot.enums.SensorType;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Data
@Setter
public class Sensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private SensorType type;

    private String unit;

    @ManyToOne
    @JoinColumn(name = "device_id")
    private Device device;

    @OneToMany(mappedBy = "sensor")
    private List<SensorReading> readings;
}
