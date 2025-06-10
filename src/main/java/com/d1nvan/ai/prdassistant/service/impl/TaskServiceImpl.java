package com.d1nvan.ai.prdassistant.service.impl;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson2.JSON;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.d1nvan.ai.prdassistant.enums.TaskStatusEnum;
import com.d1nvan.ai.prdassistant.mapper.TaskMapper;
import com.d1nvan.ai.prdassistant.model.entity.Task;
import com.d1nvan.ai.prdassistant.model.params.CreateTaskParam;
import com.d1nvan.ai.prdassistant.service.GenerateService;
import com.d1nvan.ai.prdassistant.service.TaskService;
import com.d1nvan.ai.prdassistant.util.TaskIdGenerator;

@Service
public class TaskServiceImpl extends ServiceImpl<TaskMapper, Task> implements TaskService {

    @Autowired
    private GenerateService generateService;

    @Override
    public void createTask(CreateTaskParam params) {
        Task task = new Task();
        task.setTaskId(TaskIdGenerator.generate());
        task.setTaskDesc(JSON.toJSONString(params));
        task.setStatus(TaskStatusEnum.IN_PROGRESS.getCode());
        task.setCreator(params.getCreator());
        task.setCreateTime(LocalDateTime.now());
        task.setUpdateTime(LocalDateTime.now());
        this.save(task);

        generateService.genMultiPlan(task, params);
    }
} 