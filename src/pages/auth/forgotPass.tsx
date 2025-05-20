import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Card, Typography } from "antd";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card>
        <Typography.Title level={2} className="text-center mb-[24px]">
          Reset password
        </Typography.Title>
        <Form
          className="w-[400px]"
          name="login"
          initialValues={{ remember: false }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input type="email" prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Reset password
            </Button>
            <p className="mt-[12px]">
              You have an account yet? <Link to="/login">Sign in</Link>
            </p>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
