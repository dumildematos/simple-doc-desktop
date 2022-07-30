import { Breadcrumb, Layout, Menu, Row, Col, Card } from 'antd';
import styled from 'styled-components';

const MainContainer = styled(Layout)`
  height: 100vh;
  .avatarHolder {
    margin-bottom: 24px;
    text-align: center;

    img {
      width: 104px;
      height: 104px;
      margin-bottom: 20px;
    }

    .name {
      margin-bottom: 4px;
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
    }
  }
`;

const Profile = (props: any) => {
  const user = JSON.parse(localStorage.getItem('user') || '');
  return (
    <MainContainer>
      <Row gutter={24} style={{ marginTop: 50, padding: 25, height: '100%' }}>
        <Col lg={7} md={24}>
          <Card bordered={false} style={{ marginBottom: 24 }}>
            <div>
              <div className="avatarHolder">
                <img alt="" src={user?.avatar} />
                <div className="name">
                  {`${user?.firstname} ${user?.lastname}`}
                </div>
                <div>{user?.username}</div>
              </div>
              <div className="row d-flex justify-content-center">
                <span>{user?.country}</span>
              </div>
              <div className="row d-flex justify-content-center">
                <span>{user?.phonenumber}</span>
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={17} md={24}>
          <Card bordered={false} style={{ marginBottom: 24 }}>
            Content2
          </Card>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default Profile;
