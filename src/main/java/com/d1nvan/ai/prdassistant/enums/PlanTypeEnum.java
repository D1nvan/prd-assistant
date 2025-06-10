package com.d1nvan.ai.prdassistant.enums;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PlanTypeEnum {
    INITIAL_PLAN(1, "初始方案"),
    OPTIMIZE_PLAN(2, "优化方案");

    @EnumValue
    private final Integer code;

    @JsonValue
    private final String desc;
}
