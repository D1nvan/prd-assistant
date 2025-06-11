import React from 'react';
import { Layout, Typography, Space, Button, Tooltip, Avatar } from 'antd';
import { UserOutlined, SettingOutlined, BulbOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const StyledHeader = styled(AntHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  height: 64px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  
  .logo {
    display: flex;
    align-items: center;
    
    h1 {
      margin: 0;
      color: #1890ff;
      font-size: 20px;
      margin-left: 10px;
      font-weight: 500;
      letter-spacing: 1px;
    }
    
    .logo-icon {
      color: #1890ff;
      font-size: 24px;
    }
  }
  
  .right-actions {
    display: flex;
    align-items: center;
    gap: 16px;
    
    .ant-btn {
      border: 1px solid #d9d9d9;
      
      &:hover {
        border-color: #1890ff;
        color: #1890ff;
      }
    }
    
    .ant-avatar {
      background: #1890ff;
      cursor: pointer;
      transition: all 0.3s;
      
      &:hover {
        box-shadow: 0 0 8px rgba(24, 144, 255, 0.5);
      }
    }
  }
`;

const Header = ({ onCreateTask }) => {
  return (
    <StyledHeader>
      <div className="logo">
        <BulbOutlined className="logo-icon" />
        <Title level={1}>AI产品经理助手</Title>
      </div>
      
      <div className="right-actions">
        <Tooltip title="创建新任务">
          <Button 
            type="primary" 
            onClick={onCreateTask}
          >
            创建任务
          </Button>
        </Tooltip>
        
        <Tooltip title="设置">
          <Button 
            icon={<SettingOutlined />} 
            shape="circle" 
          />
        </Tooltip>
        
        <Tooltip title="用户中心">
          <Avatar icon={<UserOutlined />} />
        </Tooltip>
      </div>
    </StyledHeader>
  );
};

export default Header; 