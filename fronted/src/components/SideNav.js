import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, Spin, Badge, Empty, Tooltip, Layout } from 'antd';
import { FolderOutlined, FileOutlined, PlusOutlined, RocketOutlined, CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import taskApi from '../api/taskService';

const { Sider } = Layout;

const StyledSider = styled(Sider)`
  display: flex;
  flex-direction: row; /* 确保子元素水平排列 */
  height: 100%;
  position: relative;
  background: #ffffff !important; /* Important to override default theme */
  border-right: 1px solid #f0f0f0;
  color: #333333;
  transition: width 0.3s ease !important; /* Important to override default theme */
  overflow: visible; /* 允许内容超出边界 */

  .tasks-menu-container {
    width: 220px;
    height: 100%;
    overflow-y: auto;
    flex-shrink: 0;
  }

  .ant-menu.tasks-menu {
    background: #ffffff;
    color: #333333;
    width: 100%;
    border-right: none;
    height: auto; /* Let content define height for scrolling */
  }
  
  .ant-menu-item {
    margin: 8px 0;
    border-radius: 4px;
    transition: all 0.2s ease;
    
    &:hover {
      background: #f5f5f5;
      color: #1890ff;
    }
    
    &.ant-menu-item-selected {
      background: #f0f7ff;
      color: #1890ff;
      font-weight: 500;
      
      &::after {
        opacity: 1;
        transform: scaleY(1);
      }
    }
    
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      border-right: 3px solid #1890ff;
      transform: scaleY(0.0001);
      opacity: 0;
      transition: transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
      content: "";
    }
  }
  
  .task-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px; /* Increased to allow more text to show */
  }
  
  .ant-menu.plans-menu {
    border-right: none;
    width: 260px;
    background: #f9f9f9;
  }
  
  .plans-container {
    width: 260px;
    flex-shrink: 0; /* Prevent plans container from shrinking */
    background: #f9f9f9;
    border-right: 1px solid #f0f0f0;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    overflow-y: auto; /* Allow vertical scrolling for plan list content */
    opacity: 1;
    transform: translateX(0);
    will-change: opacity, transform;
    display: block; /* 确保可见 */
    height: 100%; /* 确保占满整个高度 */
    position: absolute; /* 使用绝对定位 */
    left: 220px; /* 位于任务列表右侧 */
    top: 0;
    z-index: 100; /* 确保显示在最前面 */
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.05); /* 添加阴影效果，增强视觉分离 */
  }
  .plans-container-hide {
    opacity: 0;
    transform: translateX(-30px);
    pointer-events: none;
    width: 0;
    min-width: 0;
    max-width: 0;
    padding: 0;
    border: none;
  }
  
  .create-btn {
    margin: 16px;
    color: #1890ff;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 10px 16px;
    border-radius: 4px;
    background: #f0f7ff;
    transition: all 0.2s;
    border: 1px solid #e6f7ff;
    
    &:hover {
      background: #e6f7ff;
      color: #0c6dd8;
      border-color: #bae0ff;
      transform: translateY(-1px);
      box-shadow: 0 2px 6px rgba(24, 144, 255, 0.12);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    .create-icon {
      margin-right: 8px;
      font-size: 14px;
    }
  }
  
  .selected-task {
    color: #1890ff;
    border-color: #1890ff;
    background-color: #f0f7ff;
    box-shadow: 0 2px 6px rgba(24, 144, 255, 0.08);
  }

  .spin-container {
    padding: 10px 0;
    text-align: center;
  }
`;

const getTaskIcon = (status) => {
  switch (status) {
    case '已完成':
      return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
    case '处理失败':
      return <CloseCircleOutlined style={{ color: '#f5222d' }} />;
    case '进行中':
      return <LoadingOutlined style={{ color: '#1890ff' }} />;
    default:
      return <FolderOutlined />;
  }
};

const SideNav = ({ onSelectTask, onSelectPlan, onCreateTask, phone }) => {
  const [tasks, setTasks] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const menuRef = useRef(null);
  const PAGE_SIZE = 10; // 每页任务数量
  
  // 加载任务列表
  const fetchTasks = useCallback(async (pageNo) => {
    if (!phone) return; // 没有手机号时，不加载数据
    if (isFetchingMore || isInitialLoading) return; // 避免重复加载

    if (pageNo === 1) {
        setIsInitialLoading(true);
    } else {
        setIsFetchingMore(true);
    }

    try {
      const response = await taskApi.getTasks({ pageNo, pageSize: PAGE_SIZE, creator: phone });
      if (response.data.code === 200) {
        const { records, total, pages } = response.data.data;
        setTasks(prevTasks => pageNo === 1 ? records : [...prevTasks, ...records]);
        setTotalPages(pages);
        setCurrentPage(pageNo);
        setHasMore(pageNo < pages);
      } else {
        console.error('获取任务列表失败:', response.data.msg);
        setTasks([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error('获取任务列表异常:', error);
      setTasks([]);
      setHasMore(false);
    } finally {
      if (pageNo === 1) {
          setIsInitialLoading(false);
      } else {
          setIsFetchingMore(false);
      }
    }
  }, [phone, PAGE_SIZE]);
  
  useEffect(() => {
    if (phone) {
      setCurrentPage(1);
      setTasks([]); // 清空任务列表，重新加载第一页
      setHasMore(true); // 重置hasMore状态
      fetchTasks(1); 
    }
  }, [phone, fetchTasks]);

  // 滚动加载更多
  const handleScroll = useCallback((e) => {
    // directly use e.target as it is the element that fired the scroll event
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (e.target === menuRef.current && !isFetchingMore && hasMore) {
      if (scrollTop + clientHeight >= scrollHeight - 50) { // 接近底部50px时加载
        fetchTasks(currentPage + 1);
      }
    }
  }, [isFetchingMore, hasMore, currentPage, fetchTasks]);

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.addEventListener('scroll', handleScroll);
      return () => {
        menuRef.current.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);
  
  // 当选择任务时，加载对应的计划列表
  useEffect(() => {
    const fetchPlans = async () => {
      if (!selectedTask || !phone) { 
          console.log('没有选中任务或手机号，不加载计划');
          setPlans([]); 
          return; 
      }
      
      // 不再需要查找task，直接使用selectedTask作为taskId
      console.log('开始获取计划列表，任务ID:', selectedTask);
      setLoadingPlans(true);
      try {
        const response = await taskApi.getPlans(selectedTask);
        console.log('计划列表API响应:', response);
        if (response.data.code === 200) {
          console.log('获取到的计划数据:', response.data.data); // 添加日志查看数据结构
          setPlans(response.data.data || []);
          console.log('设置plans状态后，当前plans:', response.data.data || []);
        } else {
          console.error('获取计划列表失败:', response.data.msg);
          setPlans([]);
        }
      } catch (error) {
        console.error('获取计划列表异常:', error);
        setPlans([]);
      } finally {
        setLoadingPlans(false);
      }
    };
    
    fetchPlans();
  }, [phone, selectedTask]); 
  
  // 处理任务选择
  const handleTaskSelect = (taskId) => {
    console.log('Selected taskId:', taskId); // Log taskId for debugging
    setSelectedTask(taskId);
    onSelectTask(taskId);
  };
  
  // 处理计划选择
  const handlePlanSelect = (planId) => {
    console.log('计划选择:', planId); // 添加日志
    setSelectedPlan(planId);
    if (onSelectPlan) {
      const selectedPlanData = plans.find(p => p.planId === planId);
      console.log('传递给父组件的计划数据:', selectedPlanData); // 添加日志
      onSelectPlan(selectedPlanData); // 传递完整计划对象而不仅仅是ID
    }
  };
  
  // 处理创建任务按钮点击
  const handleCreateTask = () => {
    onCreateTask && onCreateTask();
  };
  
  return (
    <StyledSider
      width={selectedTask ? 520 : 220}
      theme="light"
      style={{ 
        overflowX: 'visible', // 允许内容超出边界
        position: 'relative' // 确保子元素定位正确
      }}
    >
      <div className="tasks-menu-container" ref={menuRef}>
        <Menu
          mode="inline"
          selectedKeys={selectedTask ? [selectedTask] : []}
          className="tasks-menu"
        >
          <div className="create-btn" onClick={handleCreateTask}>
            <PlusOutlined className="create-icon" />
            <span>创建新任务</span>
          </div>
          
          {(isInitialLoading && tasks.length === 0) ? (
            <div style={{ padding: 20, textAlign: 'center' }}>
              <Spin size="small" />
            </div>
          ) : (!phone) ? (
            <Empty 
              image={Empty.PRESENTED_IMAGE_SIMPLE} 
              description="请输入手机号以加载任务" 
              style={{ margin: '40px 0' }}
            />
          ) : (tasks.length === 0 && !isInitialLoading) ? (
              <Empty 
                  image={Empty.PRESENTED_IMAGE_SIMPLE} 
                  description="暂无任务" 
                  style={{ margin: '40px 0' }}
              />
          ) : (
            tasks.map(task => (
              <Menu.Item 
                key={task.taskId} 
                icon={getTaskIcon(task.status)} 
                onClick={() => handleTaskSelect(task.taskId)}
              >
                <Tooltip title={task.title} placement="right">
                  <div className="task-title">{task.title}</div>
                </Tooltip>
              </Menu.Item>
            ))
          )}
          
          {isFetchingMore && hasMore && (
            <div className="spin-container">
              <Spin size="small" />
            </div>
          )}
          {!hasMore && tasks.length > 0 && !isFetchingMore && (
            <p style={{ textAlign: 'center', color: '#999', padding: '10px 0' }}>没有更多了</p>
          )}
        </Menu>
      </div>
    
      {/* 计划列表：只有选中任务时才渲染 */}
      {console.log('渲染条件检查: selectedTask=', selectedTask, 'plans.length=', plans.length)}
      {selectedTask && (
        <div 
          className="plans-container"
          style={{
            visibility: 'visible',
            opacity: 1,
            zIndex: 10
          }}
        >
          <div style={{ padding: '16px 16px 0', borderBottom: '1px solid #f0f0f0' }}>
            <h3 style={{ margin: 0, color: '#1890ff' }}>计划列表</h3>
          </div>
          <Menu
            mode="inline"
            selectedKeys={selectedPlan ? [selectedPlan] : []}
            className="plans-menu"
            style={{ height: 'calc(100% - 50px)', overflowY: 'auto' }}
          >
            {console.log('计划列表渲染路径检查: loadingPlans=', loadingPlans, 'plans.length=', plans.length)}
            {loadingPlans ? (
              <div style={{ padding: 20, textAlign: 'center' }}>
                <Spin size="small" />
              </div>
            ) : (!phone || plans.length === 0) ? (
              <Empty 
                image={Empty.PRESENTED_IMAGE_SIMPLE} 
                description={phone ? "暂无计划" : "请输入手机号以加载计划"} 
                style={{ margin: '40px 0' }}
              />
            ) : (
              <>
                {console.log('准备渲染计划列表项，共', plans.length, '项')}
                {plans.map((plan, index) => {
                  console.log('渲染计划项:', index, plan);
                  const planKey = plan.planId || `plan-${index}`;
                  console.log('使用的计划key:', planKey);
                  return (
                    <Menu.Item 
                      key={planKey} 
                      icon={<RocketOutlined />}
                      onClick={() => handlePlanSelect(plan.planId)}
                      style={{ 
                        display: 'flex', 
                        margin: '8px 16px',
                        padding: '10px',
                        background: '#ffffff',
                        borderRadius: '4px',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                      }}
                    >
                      <Badge color="#1890ff" dot={!selectedPlan}>
                        <div className="task-title" style={{ fontWeight: 'bold' }}>
                          {plan.title || '未命名计划'} 
                          <span style={{ fontSize: '11px', marginLeft: '5px', color: '#999' }}>
                            {index + 1}/3
                          </span>
                        </div>
                      </Badge>
                    </Menu.Item>
                  );
                })}
              </>
            )}
          </Menu>
        </div>
      )}
    </StyledSider>
  );
};

export default SideNav; 