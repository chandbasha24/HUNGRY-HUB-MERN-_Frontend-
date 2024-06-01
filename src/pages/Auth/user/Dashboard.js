import React from "react";
import Layout from "../../../components/Layout/Layout";
import UserMenu from "../../../components/Layout/UserMenu";
import { useAuth } from "../../../context/auth";
import styled from "styled-components";
import { BiMailSend, BiPhoneCall, } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

const Container = styled.div`
  padding: 15px;
  margin: 15px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ColumnMenu = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
  margin-bottom: 15px;

  @media (min-width: 768px) {
    flex: 0 0 25%;
    max-width: 25%;
  }
`;

const ColumnContent = styled.div`
  flex: 0 0 100%;
  max-width: 100%;

  @media (min-width: 768px) {
    flex: 0 0 75%;
    max-width: 75%;
  }
`;

const Card = styled.div`
  width: 100%;
  padding: 15px;
`;

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"DashBoard Apna Store"}>
      <Container>
        <Row>
          <ColumnMenu>
            <UserMenu />
          </ColumnMenu>
          <ColumnContent>
            <Card>
              <h1> <FaUserCircle/>{auth?.user?.name}</h1>
              <h1>
                {" "}
                <BiMailSend />{auth?.user?.email}
              </h1>
              <h1>
                {" "}
                <BiPhoneCall />{auth?.user?.phone} , {auth?.user?.address}
              </h1>
            </Card>
          </ColumnContent>
        </Row>
      </Container>
    </Layout>
  );
};

export default Dashboard;
