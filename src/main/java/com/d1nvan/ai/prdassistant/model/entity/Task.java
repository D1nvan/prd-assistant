package com.d1nvan.ai.prdassistant.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("task")
public class Task {
    @TableId(type = IdType.AUTO)
    private Integer id;
    
    private String taskId;

    private String title;
    
    private String taskDesc;

    private String content;
    
    private Integer status;
    
    private String failReason;
    
    private String creator;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime createTime;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime updateTime;
} 