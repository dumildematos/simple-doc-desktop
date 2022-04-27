import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { FaGlobeAfrica } from '@react-icons/all-files/fa/FaGlobeAfrica';
import { FaLock } from '@react-icons/all-files/fa/FaLock';
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
import { useHistory } from 'react-router-dom';
import { MainContext } from 'renderer/contexts/MainContext';
import { onListPublicTeams } from 'renderer/services/TeamsService';
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
  const { defineBackButton , defineTeam} = useContext(MainContext);
  const [currentPag, setCurrentPag] = useState(1);
  const [searchTeamName, setSearchTeamName] = useState('');
  const history = useHistory();


  const onSearch = (value) => {
    setSearchTeamName(value);
    refetch();
  };

  const onSuccessListTeams = (data) => {
  };
  const onErrorListTeams = () => {};

  const {
    data: teamList,
    isLoading,
    isFetching,
    refetch,
  } = onListPublicTeams(
    onSuccessListTeams,
    onErrorListTeams,
    currentPag,
    searchTeamName
  );
  const navigateToTeam = (team: { id: any }) => {
    if (team) {
      defineBackButton({
        state: true,
        title: team.name || team.title,
        subtitle: '',
      });
      defineTeam(team);
      setTimeout(() => {
        history.push(`/group/${team.id}`);
      }, 100);
    }
  };

  const getKey = (id: string, index: number) => `${id}-${index}`;

  const cardListTeam = teamList?.data?.content && (
    <List
      rowKey="id"
      loading={isLoading || isFetching}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 4,
        xxl: 4,
      }}
      dataSource={teamList?.data?.content}
      renderItem={(item) => (
        <List.Item>
          <Card
            className="card"
            hoverable
            cover={<img alt={item.name} src={item.banner} />}
            onClick={() => navigateToTeam(item)}
          >
            <Card.Meta
              title={
                <a>
                  {item.type === 'PRIVATE' ? <FaLock /> : <FaGlobeAfrica />}{' '}
                  {item.name}
                </a>
              }
              description={
                <Paragraph className="item" ellipsis={{ rows: 2 }}>
                  {item.description}
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
              <span>{moment(item.createdAt).fromNow()}</span>

              <Avatar.Group
                maxCount={2}
                maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
              >
                {item.contributors.map((member, i) => (
                  <Tooltip
                    title={`${member.firstName} ${member.lastName}`}
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
              onChange={(e) => {
                setSearchTeamName(e.target.value);
                refetch();
              }}
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
        {teamList?.data?.totalElements > 0 && (
          <div className="cardList" style={{ width: '100%' }}>
            {cardListTeam}
          </div>
        )}
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
