package com.d1nvan.ai.prdassistant.model.params;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class PageParam {
    @NotNull(message = "creator不能为空")
    private String creator;
    private Integer pageNo = 1;
    private Integer pageSize = 10;
} 