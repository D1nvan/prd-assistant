import React, { useState, useEffect } from 'react';
import { Layout, Empty } from 'antd';
import styled from 'styled-components';

import Header from '../components/Header';
import SideNav from '../components/SideNav';
import PlanDetail from '../components/PlanDetail';
import CreateTaskModal from '../components/CreateTaskModal';
import PhoneModal from '../components/PhoneModal';

const { Content } = Layout;

const StyledLayout = styled(Layout)`
  height: 100vh;
  background: #ffffff;
  
  .ant-layout-content {
    height: calc(100vh - 64px);
    
    .ant-layout {
      height: 100%;
      background: #fff; /* Ensure inner layout has a background */
    }
  }
  
  .empty-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: #fafafa;
    flex: 1;
    
    .ant-empty {
      .ant-empty-image {
        opacity: 0.6;
      }
      
      .ant-empty-description {
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
`;

const PHONE_KEY = 'prd_assistant_phone';

const TasksPage = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);
  const [phone, setPhone] = useState('');

  // 首次进入检测手机号，并清空上次的手机号
  useEffect(() => {
    localStorage.removeItem(PHONE_KEY); // 每次刷新都清除手机号
    setPhoneModalVisible(true); // 每次刷新都显示弹窗
  }, []);

  // 处理手机号输入完成
  const handlePhoneOk = (inputPhone) => {
    setPhone(inputPhone);
    localStorage.setItem(PHONE_KEY, inputPhone);
    setPhoneModalVisible(false);
  };

  // 处理任务选择
  const handleTaskSelect = (taskId) => {
    setSelectedTask(taskId);
    setSelectedPlan(null);
  };
  
  // 处理计划选择
  const handlePlanSelect = (planData) => {
    console.log('TasksPage 接收到计划数据:', planData); // 添加日志
    setSelectedPlan(planData);
  };
  
  // 显示创建任务对话框
  const showCreateModal = () => {
    setCreateModalVisible(true);
  };
  
  // 关闭创建任务对话框
  const handleCreateModalCancel = () => {
    setCreateModalVisible(false);
  };
  
  // 创建任务成功回调
  const handleCreateSuccess = () => {
    setCreateModalVisible(false);
    // 这里可以刷新任务列表
  };
  
  return (
    <StyledLayout>
      <Header onCreateTask={showCreateModal} />
      <PhoneModal visible={phoneModalVisible} onOk={handlePhoneOk} />
      <Content>
        <Layout>
          <SideNav 
            onSelectTask={handleTaskSelect} 
            onSelectPlan={handlePlanSelect}
            onCreateTask={showCreateModal}
            phone={phone}
          />
          <Content>
            {selectedPlan ? (
              <PlanDetail phone={phone} planData={selectedPlan} />
            ) : (
              <div className="empty-content">
                <Empty 
                  description="请选择一个计划查看详情" 
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </div>
            )}
          </Content>
        </Layout>
      </Content>
      
      <CreateTaskModal 
        visible={createModalVisible} 
        onCancel={handleCreateModalCancel}
        onSuccess={handleCreateSuccess}
        creator={phone}
      />
    </StyledLayout>
  );
};

export default TasksPage; 