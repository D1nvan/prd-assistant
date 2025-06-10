package com.d1nvan.ai.prdassistant.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson2.JSON;
import com.d1nvan.ai.prdassistant.enums.PlanTypeEnum;
import com.d1nvan.ai.prdassistant.llm.prompt.GenMultiPlanPrompt;
import com.d1nvan.ai.prdassistant.llm.prompt.PlanOptimizePrompt;
import com.d1nvan.ai.prdassistant.llm.service.LlmService;
import com.d1nvan.ai.prdassistant.model.entity.Plan;
import com.d1nvan.ai.prdassistant.model.entity.Task;
import com.d1nvan.ai.prdassistant.model.params.CreateTaskParam;
import com.d1nvan.ai.prdassistant.model.vo.TaskDesc;
import com.d1nvan.ai.prdassistant.service.GenerateService;
import com.d1nvan.ai.prdassistant.service.PlanService;
import com.d1nvan.ai.prdassistant.service.TaskService;
import com.d1nvan.ai.prdassistant.util.RegexUtil;

@Service
public class GenerateServiceImpl implements GenerateService{

    @Autowired
    private TaskService taskService;

    @Autowired
    private LlmService llmService;

    @Autowired
    private PlanService planService;

    @Override
    public List<Plan> genMultiPlan(Task task,CreateTaskParam params) {
        return getMultiPlan(task, params);
    }

    public List<Plan> getMultiPlan(Task task,TaskDesc taskDesc){
        // 输出三种方案
        String prompt = GenMultiPlanPrompt.prompt
                .replace("{{taskDesc}}", JSON.toJSONString(taskDesc));
        String response = llmService.call(prompt, null);
        
        List<CompletableFuture<Void>> futures = new ArrayList<>();
        
        for(int i = 1; i <= 3; i++){
            String plan = RegexUtil.extractXmlTagContent(response, "<plan" + i + ">", "</plan" + i + ">");
            // 对每种方案进行优化
            CompletableFuture<Void> future = optimizePlanAsync(plan, task.getTaskId(), task.getCreator());
            futures.add(future);
        }
        
        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
        
        List<Plan> planEntities = planService.getByTaskId(task.getTaskId());
        return planEntities;
    }

    @Async("PlanExcutor")
    public CompletableFuture<Void> optimizePlanAsync(String plan, String taskId, String creator){
        String prompt = PlanOptimizePrompt.prompt
                .replace("{{initial_plan}}", plan);
        String response = llmService.call(prompt, null);
        Plan optimizedPlan = new Plan();
        optimizedPlan.setPlanId(UUID.randomUUID().toString());
        optimizedPlan.setTaskId(taskId);
        optimizedPlan.setContent(response);
        optimizedPlan.setType(PlanTypeEnum.OPTIMIZE_PLAN.getCode());
        optimizedPlan.setCreator(creator);
        planService.save(optimizedPlan);
        
        return CompletableFuture.completedFuture(null);
    }
}
