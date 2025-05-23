import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import type { FormInstance } from "antd";
const { RangePicker } = DatePicker;
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
const dateFormat = "DD-MM-YYYY";
interface SubmitButtonProps {
  form: FormInstance;
}
const Lesson4 = () => {
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
    form,
    children,
  }) => {
    const [submittable, setSubmittable] = useState<boolean>(false);
    const values = Form.useWatch([], form);
    useEffect(() => {
      form
        .validateFields({ validateOnly: true })
        .then(() => setSubmittable(true))
        .catch(() => setSubmittable(false));
    }, [form, values]);

    return (
      <Button type="primary" htmlType="submit" disabled={!submittable}>
        {children}
      </Button>
    );
  };
  return (
    <div className="p-8 bg-white border-t border-l h-full border-[#ccc]">
      <p className="font-bold">Thực hành validate form</p>
      <p className="font-bold text-[18px] my-[24px]">
        Thực hành validate form - onBlur
      </p>
      <Form
        name="validateOnly"
        form={form1}
        layout="vertical"
        validateTrigger="onBlur"
      >
        {/* Username & Email */}
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập tên đăng nhập!" },
                {
                  min: 8,
                  message: "Tên đăng nhập phải có ít nhất 8 ký tự!",
                },
                {
                  pattern: /^[a-z]+$/,
                  message:
                    "Chỉ dùng được chữ thường, không chứa số, chữ viết hoa hoặc ký tự đặc biệt ",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email!",
                },
                {
                  type: "email",
                  message: "Email không đúng định dạng!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        {/* Password & ConfirmPassword */}
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu" },
                { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự" },
                {
                  pattern:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                  message:
                    "Mật khẩu phải chứa ít nhất 1 chữ viết hoa, 1 số và 1 ký tự đặc biệt",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Vui lòng nhập lại mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "Mật khẩu xác nhận không khớp với mật khẩu đã nhập!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        {/* PhoneNumber & Website */}
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="PhoneNumber"
              name="phonenumber"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
                {
                  min: 10,
                  type: "string",
                  message: "Số điện thoại phải là số!",
                },
                {
                  pattern: /^0\d+$/,
                  message:
                    "Số điện thoại phải bắt đầu bằng 0 và chỉ chứa chữ số!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Website"
              name="website"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đường dẫn website!",
                },
                {
                  type: "url",
                  message:
                    "Đường dẫn không đúng định dạng (phải có http/https)!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        {/* Date of bird && Last name  */}
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="dateOfBird"
              label="Date of bird"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày sinh!",
                },
              ]}
            >
              <DatePicker
                className="w-full"
                format={dateFormat}
                disabledDate={(current) =>
                  !!current &&
                  (current < dayjs("01-01-1980", dateFormat) ||
                    current > dayjs("01-01-2020", dateFormat))
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="LastName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền last name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        {/* First name && LinkedIn */}
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              label="FirstName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền first name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="linkedin"
              label="LinkedIn"
              rules={[
                {
                  pattern:
                    /^$|^https?:\/\/(www\.)?linkedin\.com\/(in|feed|pub|company)\/?[A-z0-9_-]*\/?$/,
                  message: "Link LinkedIn không đúng định dạng!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        {/* Facebook */}
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="facebook"
              label="Facebook"
              rules={[
                {
                  pattern:
                    /^$|^https?:\/\/(www\.)?facebook\.com\/[A-Za-z0-9.]+\/?$/,
                  message: "Link Facebook không đúng định dạng!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="startDateEndDate"
              label="Start Date - End Date"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày bắt đầu, ngày kết thúc",
                },
              ]}
            >
              <RangePicker className="w-full" format={dateFormat} />
            </Form.Item>
          </Col>
        </Row>
        {/* Button */}
        <Row gutter={24}>
          <Col span={24}>
            <SubmitButton form={form1}>Submit</SubmitButton>
          </Col>
        </Row>
      </Form>
      <p className="font-bold text-[18px] my-[24px]">
        Thực hành validate form -onSubmit
      </p>
      <Form
        form={form2}
        onFinish={(value) => console.log(value)}
        layout="vertical"
      >
        {/* Username & Email */}
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập tên đăng nhập!" },
                {
                  min: 8,
                  message: "Tên đăng nhập phải có ít nhất 8 ký tự!",
                },
                {
                  pattern: /^[a-z]+$/,
                  message:
                    "Chỉ dùng được chữ thường, không chứa số, chữ viết hoa hoặc ký tự đặc biệt ",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email!",
                },
                {
                  type: "email",
                  message: "Email không đúng định dạng!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        {/* Password & ConfirmPassword */}
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu" },
                { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự" },
                {
                  pattern:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                  message:
                    "Mật khẩu phải chứa ít nhất 1 chữ viết hoa, 1 số và 1 ký tự đặc biệt",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Vui lòng nhập lại mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "Mật khẩu xác nhận không khớp với mật khẩu đã nhập!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        {/* PhoneNumber & Website */}
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="PhoneNumber"
              name="phonenumber"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
                {
                  min: 10,
                  type: "string",
                  message: "Số điện thoại phải là số!",
                },
                {
                  pattern: /^0\d+$/,
                  message:
                    "Số điện thoại phải bắt đầu bằng 0 và chỉ chứa chữ số!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Website"
              name="website"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đường dẫn website!",
                },
                {
                  type: "url",
                  message:
                    "Đường dẫn không đúng định dạng (phải có http/https)!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        {/* Date of bird && Last name  */}
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="dateOfBird"
              label="Date of bird"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày sinh!",
                },
              ]}
            >
              <DatePicker
                className="w-full"
                format={dateFormat}
                disabledDate={(current) =>
                  !!current &&
                  (current < dayjs("01-01-1980", dateFormat) ||
                    current > dayjs("01-01-2020", dateFormat))
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="LastName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền last name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        {/* First name && LinkedIn */}
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              label="FirstName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền first name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="linkedin"
              label="LinkedIn"
              rules={[
                {
                  pattern:
                    /^$|^https?:\/\/(www\.)?linkedin\.com\/(in|feed|pub|company)\/?[A-z0-9_-]*\/?$/,
                  message: "Link LinkedIn không đúng định dạng!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        {/* Facebook */}
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="facebook"
              label="Facebook"
              rules={[
                {
                  pattern:
                    /^$|^https?:\/\/(www\.)?facebook\.com\/[A-Za-z0-9.]+\/?$/,
                  message: "Link Facebook không đúng định dạng!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="startDateEndDate"
              label="Start Date - End Date"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày bắt đầu, ngày kết thúc",
                },
              ]}
            >
              <RangePicker className="w-full" format={dateFormat} />
            </Form.Item>
          </Col>
        </Row>
        {/* Button */}
        <Row gutter={24}>
          <Col span={24}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Lesson4;
