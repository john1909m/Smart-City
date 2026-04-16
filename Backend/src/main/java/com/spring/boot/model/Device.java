package com.spring.boot.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Data
@Setter
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String ipAddress;

    private String status; // online/offline

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    @OneToMany(mappedBy = "device")
    private List<Sensor> sensors;

    @OneToMany(mappedBy = "device")
    private List<Actuator> actuators;
}
