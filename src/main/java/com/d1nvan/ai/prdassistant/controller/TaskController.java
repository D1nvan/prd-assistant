package com.d1nvan.ai.prdassistant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.d1nvan.ai.prdassistant.model.R;
import com.d1nvan.ai.prdassistant.model.params.CreateTaskParam;
import com.d1nvan.ai.prdassistant.service.TaskService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping(value="/create")
    public R createTask(@RequestBody CreateTaskParam createTaskParam) {
        taskService.createTask(createTaskParam);
        return R.success();
    }

    
    
}
