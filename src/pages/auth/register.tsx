import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Card, Typography } from "antd";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const onFinish = (values: string) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card>
        <Typography.Title level={2} className="text-center mb-[24px]">
          Sign up to your account
        </Typography.Title>
        <Form className="w-[400px]" name="register" onFinish={onFinish}>
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
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Password doesn't match"));
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Confirm password"
            />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Sign up
            </Button>
            <p className="mt-[12px]">
              Don’t have an account yet? <Link to="/login">Sign in</Link>
            </p>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
