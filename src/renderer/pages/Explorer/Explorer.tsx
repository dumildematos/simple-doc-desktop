import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, Col, Divider, Input, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { t } from 'i18next';
import { useContext } from 'react';
import { MainContext } from 'renderer/contexts/MainContext';
import styled from 'styled-components';

const { Search } = Input;

const ExplorerContainer = styled.div`
  /* background: red !important; */
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 50px;
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

export default function Explorer(props: any) {
  const { isRouted, defineRoutedState, definePageInfo, defineNavigatedUrl } =
    useContext(MainContext);

  const onSearch = (value) => console.log(value);

  return (
    <>
      <ExplorerContainer theme={props.theme}>
        <Row justify="start">
          <Col span={4}>
            <h1 style={{ fontSize: '2rem' }}>Explorer</h1>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              allowClear
              style={{ width: 300, float: 'right' }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Card
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title="Card title"
                description="This is the description"
              />
            </Card>
          </Col>
        </Row>
      </ExplorerContainer>
    </>
  );
}
