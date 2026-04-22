package com.spring.boot.mapper;

import com.spring.boot.dto.RfidLogsResponse;
import com.spring.boot.model.RfidLog;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RfidMapper {

    default RfidLogsResponse toResponse(RfidLog log) {
        return new RfidLogsResponse(
                log.getId(),
                log.getCardId(),
                log.getStatus(),
                log.getTimestamp()
        );
    }
}
