package com.d1nvan.ai.prdassistant.service;

import java.util.List;

import com.baomidou.mybatisplus.extension.service.IService;
import com.d1nvan.ai.prdassistant.model.entity.Plan;

public interface PlanService extends IService<Plan> {

    List<Plan> getByTaskId(String taskId);
} 