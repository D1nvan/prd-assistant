package com.d1nvan.ai.prdassistant.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("task")
public class Task {
    @TableId(type = IdType.AUTO)
    private Integer id;
    
    private String taskId;
    
    private String taskDesc;
    
    private Integer status;
    
    private String failReason;
    
    private String creator;
    
    private LocalDateTime createTime;
    
    private LocalDateTime updateTime;
} 