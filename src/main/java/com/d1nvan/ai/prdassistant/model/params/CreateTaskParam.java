package com.d1nvan.ai.prdassistant.model.params;

import javax.validation.constraints.NotNull;

import com.d1nvan.ai.prdassistant.model.vo.TaskDesc;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class CreateTaskParam extends TaskDesc{
    @NotNull(message = "creator不能为空")
    private String creator;
}
