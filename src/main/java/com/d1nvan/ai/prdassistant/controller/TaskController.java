package com.d1nvan.ai.prdassistant.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import com.d1nvan.ai.prdassistant.model.R;
import com.d1nvan.ai.prdassistant.model.entity.Task;
import com.d1nvan.ai.prdassistant.model.params.CreateTaskParam;
import com.d1nvan.ai.prdassistant.model.params.PageParam;
import com.d1nvan.ai.prdassistant.model.vo.PageResult;
import com.d1nvan.ai.prdassistant.service.TaskService;
import com.d1nvan.ai.prdassistant.model.entity.Plan;
import com.d1nvan.ai.prdassistant.service.PlanService;

import java.util.List;

@Validated
@RestController
@RequestMapping("/api/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private PlanService planService;

    @PostMapping(value="/create")
    public R createTask(@RequestBody @Valid CreateTaskParam createTaskParam) {
        taskService.createTask(createTaskParam);
        return R.success();
    }

    @GetMapping(value="/list")
    public R<PageResult<Task>> getTasks(@Valid PageParam pageParam) {
        PageResult<Task> pageResult = taskService.getTasksByPage(pageParam);
        return R.success(pageResult);
    }

    @GetMapping(value="/plans")
    public R<List<Plan>> getPlansByTaskId(@RequestParam String taskId) {
        List<Plan> plans = planService.getByTaskId(taskId);
        return R.success(plans);
    }
}
