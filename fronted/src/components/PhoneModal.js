import React, { useState } from 'react';
import { Modal, Input, Button, Form } from 'antd';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    padding: 32px 24px 24px 24px;
  }
  .ant-modal-header {
    border-bottom: none;
    text-align: center;
  }
  .ant-modal-title {
    color: #1890ff;
    font-size: 20px;
    font-weight: 500;
  }
  .ant-modal-close {
    display: none;
  }
  .ant-modal-footer {
    display: none;
  }
  .phone-form {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  .ant-input {
    height: 40px;
    font-size: 16px;
    border-radius: 4px;
    width: 260px;
  }
  .ant-btn-primary {
    width: 260px;
    height: 40px;
    font-size: 16px;
    border-radius: 4px;
  }
`;

const PhoneModal = ({ visible, onOk }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      onOk && onOk(values.phone);
    } catch (e) {
      // 校验失败
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledModal
      open={visible}
      title="请输入手机号"
      closable={false}
      footer={null}
      maskClosable={false}
      centered
      width={400}
    >
      <Form form={form} className="phone-form">
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: '请输入手机号' },
            { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
          ]}
        >
          <Input placeholder="请输入手机号" maxLength={11} autoFocus />
        </Form.Item>
        <Button type="primary" loading={loading} onClick={handleOk}>
          确定
        </Button>
      </Form>
    </StyledModal>
  );
};

export default PhoneModal; 