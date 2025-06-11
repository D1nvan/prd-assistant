package com.d1nvan.ai.prdassistant.service;

import java.util.List;

import com.d1nvan.ai.prdassistant.model.Pair;
import com.d1nvan.ai.prdassistant.model.entity.Plan;
import com.d1nvan.ai.prdassistant.model.entity.Task;
import com.d1nvan.ai.prdassistant.model.params.CreateTaskParam;

public interface GenerateService {

    Pair<Task, List<Plan>> genMultiPlan(Task task,CreateTaskParam params);

}
