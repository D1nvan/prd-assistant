package com.d1nvan.ai.prdassistant.llm.tool;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.springframework.ai.tool.annotation.Tool;
import org.springframework.ai.tool.annotation.ToolParam;
import org.springframework.stereotype.Service;

/**
 * 终端操作工具
 */
@Service
public class TerminalTool {

    @Tool(description = "Windows terminal operation tool")
    public String executeCommand(@ToolParam(description = "The command to be executed in the Windows terminal") String command) {
        // 执行命令并获取输出
        StringBuffer output = new StringBuffer();
        try {
            // 构建终端命令
            ProcessBuilder processBuilder = new ProcessBuilder("cmd.exe", "/c", command);
            Process process = processBuilder.start();
            // 同时读取标准输出和错误输出
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream(), "GBK"));
                    BufferedReader errorReader = new BufferedReader(
                            new InputStreamReader(process.getErrorStream(), "GBK"))) {

                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line).append("\n");
                }
                while ((line = errorReader.readLine()) != null) {
                    output.append(line).append("\n");
                }
            }
            int exitCode = process.waitFor();
            if (exitCode != 0) {
                output.append("命令执行失败，并显示退出代码： ").append(exitCode);
            }
        } catch (Exception e) {
            output.append("执行命令时出错： ").append(e.getMessage());
        }
        return output.toString();
    }

}