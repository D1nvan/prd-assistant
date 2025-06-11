package com.d1nvan.ai.prdassistant.enums;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TaskStatusEnum {
    IN_PROGRESS(1, "进行中"),
    COMPLETED(2, "已完成"),
    FAILED(3, "处理失败"),
    DELETED(4, "已删除");;

    @EnumValue
    private final Integer code;

    @JsonValue
    private final String desc;

    public static TaskStatusEnum fromCode(Integer code) {
        for (TaskStatusEnum status : TaskStatusEnum.values()) {
            if (status.getCode().equals(code)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Invalid TaskStatus code: " + code);
    }
}
