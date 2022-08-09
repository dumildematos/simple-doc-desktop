import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { FaUsers } from '@react-icons/all-files/fa/FaUsers';
import { IoIosDocument } from '@react-icons/all-files/io/IoIosDocument';
import {
  Avatar,
  Card,
  Col,
  Empty,
  Input,
  List,
  Pagination,
  Radio,
  Row,
  Skeleton,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MainContext } from 'renderer/contexts/MainContext';
import { getUserInvitedTeams } from 'renderer/services/TeamsService';
import { FaGlobeAfrica } from '@react-icons/all-files/fa/FaGlobeAfrica';
import { FaLock } from '@react-icons/all-files/fa/FaLock';
import styled from 'styled-components';
import moment from 'moment';
import { t } from 'i18next';
import { RequestAlert } from 'renderer/utils/messages/Messages';
const { Search } = Input;
const { Paragraph } = Typography;
const InvitedContainer = styled.div`
  /* background: red !important; */
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 50px;
  height: 100vh;
  box-sizing: border-box;
  overflow: auto;
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
            svg {
              width: 100%;
            }
          }
        }
      }
    }
  }
`;

export default function InvitedGroups(props: any) {
  const {
    isRouted,
    defineRoutedState,
    definePageInfo,
    defineBackButton,
    defineTeam,
  } = useContext(MainContext);
  const [tabledTeamList, setTableLIstTeam] = useState([]);
  const history = useHistory();

  const [currentPag, setCurrentPag] = useState(1);
  const [searchTeamName, setSearchTeamName] = useState('');
  const [viewAs, setChangeView] = useState('grid');
  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
      // eslint-disable-next-line react/display-name
      render: (
        text:
          | boolean
          | React.ReactChild
          | React.ReactFragment
          | React.ReactPortal
          | null
          | undefined
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
      ) => <a>{text}</a>,
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Documentos',
      dataIndex: 'docs',
      key: 'docs',
    },
    {
      title: 'Action',
      key: 'action',
      render: (
        text: any,
        record: {
          name:
            | string
            | number
            | boolean
            | {}
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | React.ReactNodeArray
            | React.ReactPortal
            | null
            | undefined;
        }
      ) => (
        <Space size="middle">
          <a onClick={() => navigateToTeam(record)}>Entrar</a>
          {/* <a>Delete</a> */}
        </Space>
      ),
    },
  ];
  const onSuccessListTeams = (data) => {
    if (data && data.status === 200) {
      setTableLIstTeam(
        data?.data.content.map((team) => {
          return {
            id: team.id,
            key: team.id,
            title: team.name,
            desc: team.description,
            type: team.type === 'PRIVATE' ? <FaLock /> : <FaGlobeAfrica />,
            docs: team.documents.length,
          };
        })
      );
    } else {
      RequestAlert(
        props.t('comum.there_was_a_problem_with_the_request'),
        props.t('comum.click_okay_to_fix')
      );
    }
  };
  const onErrorListTeams = (error: any) => {
    RequestAlert(
      props.t('comum.there_was_a_problem_with_the_request'),
      props.t('comum.click_okay_to_fix')
    );
  };
  const {
    data: teamList,
    isLoading,
    isFetching,
    refetch,
  } = getUserInvitedTeams(
    onSuccessListTeams,
    onErrorListTeams,
    currentPag,
    searchTeamName
  );

  const onSearch = (value) => {
    setSearchTeamName(value);
    refetch();
  };

  const onChangePagination = (page) => {
    console.log(page);
    setCurrentPag(page);
  };
  const onChangeView = (e: any) => {
    setChangeView(e.target.value);
  };
  const getKey = (id: string, index: number) => `${id}-${index}`;

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
      }, 1000);
    }
  };

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
      <InvitedContainer theme={props.theme}>
        <Row justify="start">
          <Col span={24}>
            <h1 style={{ fontSize: '2rem' }}>Invited Teams</h1>
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
        <Row justify="end" style={{ padding: '0' }}>
          <Col span={4} style={{ padding: '0' }}>
            <Radio.Group value={viewAs} onChange={onChangeView}>
              <Radio.Button value="grid">
                <TableOutlined />
              </Radio.Button>
              <Radio.Button value="list">
                <UnorderedListOutlined />
              </Radio.Button>
            </Radio.Group>
          </Col>
        </Row>

        {viewAs === 'grid' && (
          <Row
            className="cards-container"
            gutter={[8, 8]}
            style={{
              paddingTop: '10px',
              display: 'flex',
            }}
          >
            {teamList?.data.totalElements === 0 && (
              <Col span={24}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </Col>
            )}

            {teamList?.data?.totalElements > 0 && (
              <div className="cardList" style={{ width: '100%' }}>
                {cardListTeam}
              </div>
            )}

            {teamList?.data.totalElements === 0 && viewAs === 'list' && (
              <Col span={24}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </Col>
            )}
          </Row>
        )}
        {teamList?.data.totalElements > 0 &&
          viewAs === 'grid' &&
          teamList?.data && (
            <Row style={{ marginTop: '2rem' }}>
              <Col>
                {/* <Pagination
                  showSizeChanger
                  onShowSizeChange={onShowPageSizeChange}
                  onChange={onShowPageSizeChange}
                  pageSize={teamList?.data.totalPages}
                  total={teamList?.data.totalElements}
                /> */}
                <Pagination
                  current={currentPag}
                  onChange={onChangePagination}
                  total={teamList?.data.totalElements}
                  pageSize={teamList?.data.size}
                />
              </Col>
            </Row>
          )}
        {teamList?.data.totalElements === 0 && viewAs === 'list' && (
          <Col span={24}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Col>
        )}
        {teamList?.data.totalElements > 0 && viewAs === 'list' && (
          <Row className="cards-container" style={{ paddingTop: '10px' }}>
            <Col span={24}>
              <Table columns={tableColumns} dataSource={tabledTeamList} />
            </Col>
          </Row>
        )}
      </InvitedContainer>
    </>
  );
}
