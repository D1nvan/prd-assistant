package com.d1nvan.ai.prdassistant.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.d1nvan.ai.prdassistant.model.entity.Task;
import com.d1nvan.ai.prdassistant.model.params.CreateTaskParam;
import com.d1nvan.ai.prdassistant.model.params.PageParam;
import com.d1nvan.ai.prdassistant.model.vo.PageResult;

public interface TaskService extends IService<Task> {

    void createTask(CreateTaskParam params);

    PageResult<Task> getTasksByPage(PageParam pageParam);

} 