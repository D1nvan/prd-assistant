package com.d1nvan.ai.prdassistant.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.d1nvan.ai.prdassistant.mapper.PlanMapper;
import com.d1nvan.ai.prdassistant.model.entity.Plan;
import com.d1nvan.ai.prdassistant.service.PlanService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlanServiceImpl extends ServiceImpl<PlanMapper, Plan> implements PlanService {

    @Autowired
    private PlanMapper planMapper;

    @Override
    public List<Plan> getByTaskId(String taskId) {
        return planMapper.selectListByTaskId(taskId);
    }
} 