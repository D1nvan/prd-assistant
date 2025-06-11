import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

const { Text } = Typography;

const StyledPlanDetail = styled.div`
  padding: 24px;
  height: 100%;
  overflow: auto;
  background: #ffffff;
  flex: 1;
  min-width: 0;
  
  .markdown-content {
    font-size: 16px;
    line-height: 1.6;
    
    h1, h2, h3, h4, h5, h6 {
      color: #1890ff;
      margin-top: 24px;
      margin-bottom: 16px;
    }
    
    h1 {
      font-size: 28px;
      border-bottom: 1px solid #f0f0f0;
      padding-bottom: 12px;
    }
    
    h2 {
      font-size: 24px;
    }
    
    h3 {
      font-size: 20px;
    }
    
    p {
      margin-bottom: 16px;
    }
    
    ul, ol {
      padding-left: 24px;
      margin-bottom: 16px;
    }
    
    li {
      margin-bottom: 8px;
    }
    
    pre {
      background: #f5f5f5;
      padding: 16px;
      border-radius: 4px;
      overflow: auto;
    }
    
    code {
      background: #f5f5f5;
      padding: 2px 4px;
      border-radius: 3px;
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    }
    
    blockquote {
      border-left: 4px solid #1890ff;
      padding-left: 16px;
      color: #666;
      margin: 0 0 16px;
    }
    
    table {
      border-collapse: collapse;
      width: 100%;
      margin-bottom: 16px;
    }
    
    th, td {
      border: 1px solid #f0f0f0;
      padding: 8px 12px;
    }
    
    th {
      background: #f5f5f5;
    }
    
    img {
      max-width: 100%;
    }
  }
  
  .plan-empty {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: rgba(0, 0, 0, 0.45);
  }
`;

const PlanDetail = ({ planData, phone }) => {
  if (!phone) {
    return (
      <StyledPlanDetail>
        <div className="plan-empty">
          <Text style={{ fontSize: 16 }}>请输入手机号以加载详情</Text>
        </div>
      </StyledPlanDetail>
    );
  }

  if (!planData) {
    return (
      <StyledPlanDetail>
        <div className="plan-empty">
          <Text style={{ fontSize: 16 }}>请选择一个计划查看详情</Text>
        </div>
      </StyledPlanDetail>
    );
  }
  
  // 获取content内容
  let markdownContent = '';
  try {
    if (typeof planData.content === 'string') {
      // 尝试解析JSON字符串
      try {
        const contentObj = JSON.parse(planData.content);
        markdownContent = contentObj;
      } catch (e) {
        // 如果不是JSON，则直接使用字符串
        markdownContent = planData.content;
      }
    } else {
      // 如果content已经是对象
      markdownContent = planData.content;
    }
    
    // 如果markdownContent是对象，转换为Markdown字符串
    if (typeof markdownContent === 'object' && markdownContent !== null) {
      markdownContent = Object.entries(markdownContent)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return `## ${key}\n\n${value.map(item => `- ${item}`).join('\n')}`;
          }
          return `## ${key}\n\n${value}`;
        })
        .join('\n\n');
    }
  } catch (e) {
    console.error('处理内容失败:', e);
    markdownContent = '无法解析内容';
  }
  
  return (
    <StyledPlanDetail>
      <div className="markdown-content">
        <ReactMarkdown>
          {markdownContent}
        </ReactMarkdown>
      </div>
    </StyledPlanDetail>
  );
};

export default PlanDetail; 