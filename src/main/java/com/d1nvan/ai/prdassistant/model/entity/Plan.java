package com.d1nvan.ai.prdassistant.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("plan")
public class Plan {
    @TableId(type = IdType.AUTO)
    private Integer id;
    
    private String planId;
    
    private String taskId;
    
    private Integer type;
    
    private String content;
    
    private String creator;
    
    private LocalDateTime createTime;
    
    private LocalDateTime updateTime;
} 