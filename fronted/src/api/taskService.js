import axios from 'axios';

const API_BASE_URL = 'http://localhost:8888/api'; // 根据实际情况配置

const taskApi = {
  // 创建任务
  createTask: (taskData) => {
    return axios.post(`${API_BASE_URL}/task/create`, taskData);
  },
  
  // 获取任务列表（支持分页）
  getTasks: (pageParam) => {
    return axios.get(`${API_BASE_URL}/task/list`, {
      params: pageParam // 将分页参数作为URL参数传递
    });
  },
  
  // 获取任务详情
  getTaskDetail: (taskId) => {
    return axios.get(`${API_BASE_URL}/task/detail`, {
      params: { taskId }
    });
  },
  
  // 获取计划列表
  getPlans: (taskId) => {
    return axios.get(`${API_BASE_URL}/task/plans`, {
      params: { taskId }
    });
  },
  
  // 获取计划详情
  getPlanDetail: (planId) => {
    return axios.get(`${API_BASE_URL}/task/plan/detail`, {
      params: { planId }
    });
  }
};

export default taskApi; 