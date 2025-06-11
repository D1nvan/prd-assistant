package com.d1nvan.ai.prdassistant.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskVo {
    private String id;
    private String title;
    private String status;
} 