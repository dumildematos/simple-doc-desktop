import { Row, Col, Input, Tabs, Card } from 'antd';
import styled from 'styled-components';
import imgBanner from './marketplace1.jpg';
const { Search } = Input;

const MarketPlaceContainer = styled.div`
  /* background: red !important; */
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  main.ant-layout-content.site-layout-background {
    padding: 0 !important;
  }
  .banner {
    background-image: url(${imgBanner});
    background-size: cover;
    background-attachment: scroll;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    span.ant-input-group-wrapper.ant-input-search {
      width: 300px;
      background: transparent;
    }
  }
  .ant-row {
    &.main {
      height: 100%;
    }
    .ant-col {
      border-radius: 3px;
      background: ${(props: { theme: { cardBg: any } }) => props.theme.cardBg};
      &.main {
        height: 100%;
      }
      padding: 12px;
      .btn-action-pmd {
        font-size: 1rem;
        color: var(--purple-1);
      }
      h4,
      h3,
      p {
        color: ${(props: { theme: { cardTexColor: any } }) =>
          props.theme.cardTexColor} !important;
      }
      p {
        font-size: 0.8rem;
      }
      .ant-avatar-group {
      }
      &.doc-ls {
        padding: 0;
        .ant-card {
          border: 1px solid var(--purple-1);
        }
        .doc-item {
          background-color: blue;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .square {
            width: 70px;
            height: 70px !important;
            background: green;
            svg {
              width: 100%;
            }
          }
        }
      }
    }
  }
`;
const { TabPane } = Tabs;
const { Meta } = Card;

export default function Marketplace(props: any) {
  const onSearch = (value) => console.log(value);

  return (
    <>
      <MarketPlaceContainer theme={props.theme}>
        <div className="banner">
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        </div>
        <Row>
          <Col span={24}>
            <Tabs tabPosition="left">
              <TabPane tab="Tab 1" key="1">
                <Row>
                  <Col>
                    <Card
                      hoverable
                      style={{ width: 240 }}
                      cover={
                        <img
                          alt="example"
                          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                        />
                      }
                    >
                      <Meta title="Europe Street beat" description="All - 5$" />
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Tab 2" key="2">
                Content of Tab 2
              </TabPane>
              <TabPane tab="Tab 3" key="3">
                Content of Tab 3
              </TabPane>
              <TabPane tab="Tab 4" key="4">
                Content of Tab 4
              </TabPane>
              <TabPane tab="Tab 5" key="5">
                Content of Tab 5
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </MarketPlaceContainer>
    </>
  );
}
