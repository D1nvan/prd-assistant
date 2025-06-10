package com.d1nvan.ai.prdassistant.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.d1nvan.ai.prdassistant.model.entity.Plan;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface PlanMapper extends BaseMapper<Plan> {
    @Select("SELECT * FROM plan WHERE task_id = #{taskId}")
    List<Plan> selectListByTaskId(String taskId);
} 