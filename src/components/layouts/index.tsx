import { Layout } from "antd";
import HeaderUser from "./header";
import SiderUser from "./sider";
import { Outlet } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const LayoutUser = () => {
  return (
    <Layout className="!min-h-screen">
      <Header className="!bg-white">
        <HeaderUser />
      </Header>
      <Layout>
        <Sider className="!bg-white">
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
