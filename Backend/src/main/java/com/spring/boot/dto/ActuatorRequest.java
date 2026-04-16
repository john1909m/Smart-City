package com.spring.boot.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ActuatorRequest {
    private String state; // ON / OFF
}