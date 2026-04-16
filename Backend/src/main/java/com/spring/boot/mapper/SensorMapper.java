package com.spring.boot.mapper;

import com.spring.boot.dto.SensorReadingResponse;
import com.spring.boot.model.SensorReading;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SensorMapper {
    default SensorReadingResponse toResponse(SensorReading r) {
        return new SensorReadingResponse(
                r.getId(),
                r.getValue(),
                r.getTimestamp(),
                r.getSensor().getType().name()
        );
    }

}
