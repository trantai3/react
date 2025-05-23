import { useState } from "react";
import { faker } from "@faker-js/faker";
import { Table, Button, Image } from "antd";
import type { ColumnsType } from "antd/es/table";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  birthday: string;
  sex: string;
  jobArea: string;
  phone: string;
  subscriptionTier: string;
  avatar: string;
};

const generateUser = (id: number): User => {
  const gender = faker.person.sexType();
  const birthDate = faker.date.birthdate({ min: 18, max: 60, mode: "age" });
  const age = new Date().getFullYear() - birthDate.getFullYear();

  return {
    id,
    firstName: faker.person.firstName(gender),
    lastName: faker.person.lastName(),
    age,
    address: faker.location.streetAddress(),
    birthday: birthDate.toLocaleDateString("en-GB"),
    sex: gender,
    jobArea: faker.person.jobArea(),
    phone: faker.phone.number(),
    subscriptionTier: faker.helpers.arrayElement([
      "free",
      "basic",
      "business",
      "develop",
      "design",
    ]),
    avatar: faker.image.avatar(),
  };
};

const columns: ColumnsType<User> = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "First Name", dataIndex: "firstName", key: "firstName" },
  { title: "Last Name", dataIndex: "lastName", key: "lastName" },
  { title: "Age", dataIndex: "age", key: "age" },
  { title: "Address", dataIndex: "address", key: "address" },
  { title: "Birthday", dataIndex: "birthday", key: "birthday" },
  { title: "Sex", dataIndex: "sex", key: "sex" },
  { title: "Job Area", dataIndex: "jobArea", key: "jobArea" },
  { title: "Phone", dataIndex: "phone", key: "phone" },
  {
    title: "Subscription Tier",
    dataIndex: "subscriptionTier",
    key: "subscriptionTier",
  },
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
    render: (avatar: string) => <Image src={avatar} width={32} height={32} />,
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <>
        <Button className="ml-2" type="link" danger>
          Delete
        </Button>
      </>
    ),
  },
];

const Lesson3 = () => {
  const [users] = useState<User[]>(
    Array.from({ length: 100 }, (_, i) => generateUser(i + 1))
  );

  return (
    <div className="p-8 bg-white border-t border-l h-full border-[#ccc]">
      <p className="mb-6 font-bold">Thực hành mockup data</p>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
      />
    </div>
  );
};

export default Lesson3;
