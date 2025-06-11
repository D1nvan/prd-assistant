package com.d1nvan.ai.prdassistant.llm.prompt;

public class TaskSummerizePrompt {

    public static String prompt = """
    你是一个需求分析专家，你需要根据下面的需求描述总结出该方案的名称，不超过十五个字，需要包括系统的名称与目标。
    <task_desc>
    {{task_desc}}
    </task_desc>
    你只需要返回总结的结果，无需返回其他内容
    """;

}
