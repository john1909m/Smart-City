package com.spring.boot.mapper;

import com.spring.boot.dto.ActuatorResponse;
import com.spring.boot.model.ActuatorState;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ActuatorMapper {
    default ActuatorResponse toResponse(ActuatorState s) {
        return new ActuatorResponse(
                s.getId(),
                s.getState(),
                s.getTimestamp(),
                s.getActuator().getName()
        );
    }
}
