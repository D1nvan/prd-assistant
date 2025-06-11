package com.d1nvan.ai.prdassistant.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson2.JSON;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.d1nvan.ai.prdassistant.enums.TaskStatusEnum;
import com.d1nvan.ai.prdassistant.llm.prompt.TaskSummerizePrompt;
import com.d1nvan.ai.prdassistant.llm.service.LlmService;
import com.d1nvan.ai.prdassistant.mapper.TaskMapper;
import com.d1nvan.ai.prdassistant.model.Pair;
import com.d1nvan.ai.prdassistant.model.entity.Plan;
import com.d1nvan.ai.prdassistant.model.entity.Task;
import com.d1nvan.ai.prdassistant.model.params.CreateTaskParam;
import com.d1nvan.ai.prdassistant.model.params.PageParam;
import com.d1nvan.ai.prdassistant.model.vo.PageResult;
import com.d1nvan.ai.prdassistant.service.GenerateService;
import com.d1nvan.ai.prdassistant.service.TaskService;
import com.d1nvan.ai.prdassistant.util.TaskIdGenerator;

@Service
public class TaskServiceImpl extends ServiceImpl<TaskMapper, Task> implements TaskService {

    @Autowired
    private GenerateService generateService;

    @Autowired
    private LlmService llmService;

    @Override
    public void createTask(CreateTaskParam params) {
        Task task = new Task();
        try{
            task = saveTask(params);
            Pair<Task, List<Plan>> pair = generateService.genMultiPlan(task, params);
            task = pair.getFirst();
            task.setStatus(TaskStatusEnum.COMPLETED.getCode());
        }catch(Exception e){
            task.setStatus(TaskStatusEnum.FAILED.getCode());
            task.setFailReason(e.getMessage());
        }finally{
            this.updateById(task);
        }
    }

    public Task saveTask(CreateTaskParam params){
        Task task = new Task();
        task.setTaskId(TaskIdGenerator.generate());
        task.setTaskDesc(JSON.toJSONString(params));
        String prompt = TaskSummerizePrompt.prompt.replace("{{task_desc}}", JSON.toJSONString(params));
        task.setTitle(llmService.call(prompt, null));
        task.setStatus(TaskStatusEnum.IN_PROGRESS.getCode());
        task.setCreator(params.getCreator());
        task.setCreateTime(LocalDateTime.now());
        task.setUpdateTime(LocalDateTime.now());
        this.save(task);
        return task;
    }

    @Override
    public PageResult<Task> getTasksByPage(PageParam pageParam) {
        // 构建MyBatis-Plus分页对象
        Page<Task> page = new Page<>(pageParam.getPageNo(), pageParam.getPageSize());
        // 查询条件
        LambdaQueryWrapper<Task> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Task::getCreator, pageParam.getCreator());
        queryWrapper.ne(Task::getStatus, TaskStatusEnum.DELETED.getCode());
        // 执行分页查询
        IPage<Task> taskIPage = this.page(page, queryWrapper);

        return new PageResult<>(taskIPage.getRecords(), taskIPage.getTotal(), taskIPage.getPages(), taskIPage.getSize());
    }
}