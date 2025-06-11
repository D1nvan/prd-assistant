import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message, Space, Typography, Divider } from 'antd';
import { RocketOutlined, BulbOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import taskApi from '../api/taskService';

const { TextArea } = Input;
const { Title } = Typography;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: #ffffff;
    border: 1px solid #f0f0f0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
  }
  
  .ant-modal-header {
    background: transparent;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .ant-modal-title {
    color: #1890ff;
    text-align: center;
    font-weight: 500;
  }
  
  .ant-modal-close {
    color: rgba(0, 0, 0, 0.45);
    
    &:hover {
      color: rgba(0, 0, 0, 0.75);
    }
  }
  
  .ant-modal-body {
    padding: 24px;
  }
  
  .ant-form-item-label > label {
    color: rgba(0, 0, 0, 0.85);
  }
  
  .ant-input, .ant-input-affix-wrapper, .ant-input-textarea {
    background: #ffffff;
    border: 1px solid #d9d9d9;
    
    &:hover, &:focus {
      border-color: #1890ff;
      box-shadow: 0 0 5px rgba(24, 144, 255, 0.3);
    }
  }
  
  .ant-form-item {
    margin-bottom: 20px;
  }
  
  .section-title {
    color: #1890ff;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    
    .icon {
      margin-right: 8px;
      font-size: 18px;
    }
  }
  
  .ant-divider {
    border-color: #f0f0f0;
    margin: 24px 0;
  }
  
  .form-actions {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 24px;
    
    .ant-btn {
      height: 40px;
      min-width: 100px;
      font-size: 16px;
      padding: 0 24px;
      border-radius: 4px;
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    
    .ant-btn-primary {
      background: #1890ff;
      border: none;
      
      &:hover {
        background: #40a9ff;
        transform: translateY(-1px);
        box-shadow: 0 2px 6px rgba(24, 144, 255, 0.3);
      }
    }
  }
`;

const CreateTaskModal = ({ visible, onCancel, onSuccess, creator }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      form.resetFields();
    }
  }, [visible, form]);
  
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      try {
        const response = await taskApi.createTask({
          ...values,
          creator: creator || 'current_user',
          coreUserImage: values.coreUserImage ? values.coreUserImage.split('\n').filter(Boolean) : []
        });
        
        if (response.data.code === 200) {
          message.success('任务创建成功');
          form.resetFields();
          onSuccess && onSuccess();
        } else {
          message.error('任务创建失败: ' + response.data.msg);
        }
      } catch (error) {
        console.error('创建任务出错:', error);
        message.error('任务创建失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };
  
  return (
    <StyledModal
      title="创建新任务"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
      centered
      destroyOnClose
    >
      <Form 
        form={form} 
        layout="vertical"
        initialValues={{
          customerVision: '',
          customerGoal: '',
          customerPain: '',
          customerDemand: '',
          coreUserImage: '',
          currentProcedure: '',
          existingTechStack: '',
          keyNodes: '',
          successStandard: '',
          riskAssessment: '',
          otherInfo: ''
        }}
      >
        <Title level={4} className="section-title">
          <BulbOutlined className="icon" /> 客户需求洞察
        </Title>
        
        <Form.Item 
          name="customerVision" 
          label="客户愿景" 
          rules={[{ required: true, message: '请输入客户愿景' }]}
          tooltip="试图解决的根本问题是什么？（e.g. 提升供应链效率？优化患者就医体验？）"
        >
          <TextArea rows={2} placeholder="试图解决的根本问题是什么？（e.g. 提升供应链效率？优化患者就医体验？）" />
        </Form.Item>
        
        <Form.Item 
          name="customerGoal" 
          label="客户目标" 
          rules={[{ required: true, message: '请输入客户目标' }]}
          tooltip="期望实现的业务成果（量化指标）？（e.g. 客户说“提高效率”，需追问：“当前平均订单处理时间多少？目标降到多少分钟？”）？"
        >
          <TextArea rows={2} placeholder="期望实现的业务成果（量化指标）？（e.g. 客户说“提高效率”，需追问：“当前平均订单处理时间多少？目标降到多少分钟？”）？" />
        </Form.Item>
        
        <Form.Item 
          name="customerPain" 
          label="客户痛点" 
          rules={[{ required: true, message: '请输入客户痛点' }]}
          tooltip="客户痛点是什么？痛点是否源于真实场景？现有替代方案是什么？"
        >
          <TextArea rows={2} placeholder="客户痛点是什么？痛点是否源于真实场景？现有替代方案是什么？" />
        </Form.Item>
        
        <Form.Item 
          name="customerDemand" 
          label="客户需求" 
          rules={[{ required: true, message: '请输入客户需求' }]}
        >
          <TextArea rows={2} placeholder="请详细描述客户的需求" />
        </Form.Item>
        
        <Divider />
        
        <Title level={4} className="section-title">
          <UserOutlined className="icon" /> 用户与流程分析
        </Title>
        
        <Form.Item 
          name="coreUserImage" 
          label="核心用户画像" 
          tooltip="按价值流分组用户画像，每行一个用户类型"
        >
          <TextArea rows={3} placeholder="按价值流分组用户画像，每行一个用户类型" />
        </Form.Item>
        
        <Form.Item 
          name="currentProcedure" 
          label="现有流程" 
          tooltip="描述现有的流程中，并指出当前的断点与妥协方案"
        >
          <TextArea rows={3} placeholder="描述现有的流程中，并指出当前的断点与妥协方案" />
        </Form.Item>
        
        <Form.Item 
          name="existingTechStack" 
          label="现有技术生态" 
          tooltip="需集成的现有系统以及交互逻辑"
        >
          <TextArea rows={2} placeholder="需集成的现有系统以及交互逻辑" />
        </Form.Item>
        
        <Form.Item 
          name="keyNodes" 
          label="关键节点" 
          tooltip="亟需改进的节点"
          rules={[{ required: true, message: '请输入关键节点' }]}
        >
          <TextArea rows={2} placeholder="亟需改进的节点" />
        </Form.Item>
        
        <Divider />
        
        <Title level={4} className="section-title">
          <RocketOutlined className="icon" /> 成功与风险评估
        </Title>
        
        <Form.Item 
          name="successStandard" 
          label="成功标准定义" 
          tooltip="上线后衡量成功的核心KPI"
          rules={[{ required: true, message: '请输入成功标准' }]}
        >
          <TextArea rows={2} placeholder="上线后衡量成功的核心KPI" />
        </Form.Item>
        
        <Form.Item 
          name="riskAssessment" 
          label="风险评估" 
          tooltip="潜在风险与应对措施"
        >
          <TextArea rows={2} placeholder="潜在风险与应对措施" />
        </Form.Item>
        
        <Form.Item name="otherInfo" label="其他信息">
          <TextArea rows={2} placeholder="其他需要补充的信息" />
        </Form.Item>
        
        <div className="form-actions">
          <Button onClick={onCancel} type="default">
            取消
          </Button>
          <Button type="primary" loading={loading} onClick={handleSubmit}>
            创建任务
          </Button>
        </div>
      </Form>
    </StyledModal>
  );
};

export default CreateTaskModal; 