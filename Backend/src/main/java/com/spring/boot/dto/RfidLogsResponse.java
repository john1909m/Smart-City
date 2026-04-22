package com.spring.boot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class RfidLogsResponse {
    private Long id;
    private String cardId;
    private String status;
    private LocalDateTime timestamp;
}
