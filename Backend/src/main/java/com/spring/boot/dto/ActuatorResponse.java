package com.spring.boot.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ActuatorResponse {
    private Long id;
    private String state;
    private LocalDateTime timestamp;
    private String actuatorName;
}
