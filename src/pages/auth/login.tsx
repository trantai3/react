import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, Card, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/authSlice";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = () => {
    dispatch(login());
    navigate("/welcome");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card>
        <Typography.Title level={2} className="text-center mb-[24px]">
          Sign in to your account
        </Typography.Title>
        <Form
          className="w-[400px]"
          name="login"
          initialValues={{ remember: false }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input type="email" prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to="/forgot-password">Forgot password</Link>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Sign in
            </Button>
            <p className="mt-[12px]">
              Don't have an account yet? <Link to="/register">Sign up</Link>
            </p>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
