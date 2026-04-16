package com.spring.boot.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class Actuator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type; // LED, door, etc

    @ManyToOne
    @JoinColumn(name = "device_id")
    private Device device;

    @OneToMany(mappedBy = "actuator")
    private List<ActuatorState> states;
}