import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Input,
  List,
  Row,
  Tooltip,
  Typography,
} from 'antd';
import Meta from 'antd/lib/card/Meta';
import { t } from 'i18next';
import moment from 'moment';
import { useContext, useState } from 'react';
import { MainContext } from 'renderer/contexts/MainContext';
import styled from 'styled-components';

const { Search } = Input;
const { Paragraph } = Typography;
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
      .ant-card-cover {
        height: 200px;
        img {
          height: 100%;
        }
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
  const { defineBackButton } = useContext(MainContext);
  const [list, setList] = useState([
    {
      activeUser: 103939,
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
      content:
        '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
      cover:
        'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
      createdAt: 1650181620726,
      description:
        '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
      href: 'https://ant.design',
      id: 'fake-list-0',
      like: 122,
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
      message: 13,
      newUser: 1405,
      owner: '付小小',
      percent: 85,
      star: 181,
      status: 'active',
      subDescription: '那是一种内在的东西， 他们到达不了，也无法触及的',
      title: 'Alipay1',
      updatedAt: 1650181620726,
      members: [
        {
          avatar:
            'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          id: 'member1',
          name: '曲丽丽',
        },
      ],
    },
    {
      activeUser: 104537,
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
      content:
        '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
      cover:
        'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
      createdAt: 1650214081469,
      description:
        '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
      href: 'https://ant.design',
      id: 'fake-list-1',
      like: 105,
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
      members: [
        {
          avatar:
            'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          id: 'member1',
          name: '曲丽丽',
        },
        {
          avatar:
            'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          id: 'member2',
          name: '王昭君',
        },
      ],
      message: 20,
      newUser: 1530,
      owner: '曲丽丽',
      percent: 86,
      star: 105,
      status: 'exception',
      subDescription: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
      title: 'Angular',
      updatedAt: 1650214081469,
    },
  ]);
  const onSearch = (value) => console.log(value);

  const getKey = (id: string, index: number) => `${id}-${index}`;

  const cardList = list && (
    <List
      rowKey="id"
      loading={false}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <Card
            className="card"
            hoverable
            cover={<img alt={item.title} src={item.cover} />}
          >
            <Card.Meta
              title={<a>{item.title}</a>}
              description={
                <Paragraph className="item" ellipsis={{ rows: 2 }}>
                  {item.subDescription}
                </Paragraph>
              }
            />
            <div
              className="cardItemContent"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>{moment(item.updatedAt).fromNow()}</span>

              <Avatar.Group
                maxCount={2}
                maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
              >
                {item.members.map((member, i) => (
                  <Tooltip
                    title="Ant User"
                    placement="top"
                    key={getKey(item.id, i)}
                  >
                    <Avatar
                      src={member.avatar}
                      style={{ backgroundColor: '#87d068' }}
                    />
                  </Tooltip>
                ))}
              </Avatar.Group>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );

  return (
    <>
      <ExplorerContainer theme={props.theme}>
        <Row justify="start">
          <Col span={24}>
            <h1 style={{ fontSize: '2rem' }}>Explorer</h1>
            <p>Encontre equipes de trabalho públicos</p>
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
        {/* <Row> */}
        {/* <Col span={24}> */}
        {/* <MContainer>
            <div className="coverCardList">
              <Card bordered={false}>

              </Card>
            </div>

          </MContainer> */}
        {/* </Col> */}
        <div className="cardList">{cardList}</div>
        {/* </Row> */}
        {/* <Row>
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
        </Row> */}
      </ExplorerContainer>
    </>
  );
}
