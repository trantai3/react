import { Layout } from "antd";
import HeaderUser from "./header";
import SiderUser from "./sider";
import { Outlet } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const LayoutUser = () => {
  return (
    <Layout className="!min-h-screen">
      <Header className="!bg-white !px-[10px]">
        <HeaderUser />
      </Header>
      <Layout>
        <Sider width="10%" className="!bg-white">
          <SiderUser />
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutUser;
