package com.d1nvan.ai.prdassistant.model.vo;

import java.util.List;

import lombok.Data;

@Data
public class TaskDesc {
    // 客户愿景,试图解决的根本问题是什么？（e.g. 提升供应链效率？优化患者就医体验？）
    private String customerVision;
    // 客户目标,期望实现的业务成果（量化指标）？（e.g. 客户说“提高效率”，需追问：“当前平均订单处理时间多少？目标降到多少分钟？”）
    private String customerGoal;
    // 客户痛点,痛点是否源于真实场景？现有替代方案是什么？
    private String customerPain;
    // 客户需求
    private String customerDemand;
    // 核心用户画像,按价值流分组用户画像
    private List<String> coreUserImage;
      
    // 现有流程,描述现有的流程中，并指出当前的断点与妥协方案
    private String currentProcedure;
    // 现有技术生态,需集成的现有系统以及交互逻辑
    private String existingTechStack;
    // 关键节点,亟需改进的节点
    private String keyNodes;

    // 成功标准定义,上线后衡量成功的核心KPI（e.g. 用户留存率提升20%？错误率下降50%？）
    private String successStandard;
    // 风险评估,潜在风险与应对措施
    private String riskAssessment;
    
    // 其他信息
    private String otherInfo;
}
