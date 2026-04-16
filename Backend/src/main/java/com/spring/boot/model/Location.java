package com.spring.boot.model;

import com.spring.boot.enums.LocationType;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Data
@Setter
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private LocationType type;

    private String description;

    @OneToMany(mappedBy = "location")
    private List<Device> devices;
}
