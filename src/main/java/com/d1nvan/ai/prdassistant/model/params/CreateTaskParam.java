package com.d1nvan.ai.prdassistant.model.params;

import com.d1nvan.ai.prdassistant.model.vo.TaskDesc;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class CreateTaskParam extends TaskDesc{
    private String creator;
}
