import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { FaUsers } from '@react-icons/all-files/fa/FaUsers';
import { IoIosDocument } from '@react-icons/all-files/io/IoIosDocument';
import {
  Card,
  Col,
  Empty,
  Input,
  Pagination,
  Radio,
  Row,
  Skeleton,
  Space,
  Table,
} from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MainContext } from 'renderer/contexts/MainContext';
import { getUserInvitedTeams } from 'renderer/services/TeamsService';
import styled from 'styled-components';
const { Search } = Input;
const InvitedContainer = styled.div`
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
  const onSearch = (value) => console.log(value);
  const [currentPag, setCurrentPag] = useState(1);
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
      title: 'Membros',
      dataIndex: 'menbers',
      key: 'menbers',
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
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const onSuccessListTeams = (data) => {
    setTableLIstTeam(
      data?.data.content.map((team) => {
        return {
          id: team.id,
          key: team.id,
          title: team.name,
          desc: team.description,
          menbers: 20,
          docs: team.documents.length,
        };
      })
    );
  };
  const onErrorListTeams = () => {};
  const {
    data: teamList,
    isLoading,
    isFetching,
  } = getUserInvitedTeams(onSuccessListTeams, onErrorListTeams, currentPag);

  console.log(teamList);

  const onChangePagination = (page) => {
    console.log(page);
    setCurrentPag(page);
  };
  const onChangeView = (e: any) => {
    setChangeView(e.target.value);
  };

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
              display: 'block',
            }}
          >
            {teamList?.data.totalElements === 0 && (
              <Col span={24}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </Col>
            )}

            {teamList?.data.totalElements > 0 &&
              teamList?.data.content.map((item, index) => (
                <Col key={item.id} span={8}>
                  <Card
                    style={{ width: '100%' }}
                    onClick={() => navigateToTeam(item)}
                    actions={[
                      // eslint-disable-next-line react/jsx-key
                      [<FaUsers />, <span>{item.menbers}</span>],
                      // eslint-disable-next-line react/jsx-key
                      [<IoIosDocument />, <span>{item.documents.length}</span>],
                    ]}
                    className="teams-card"
                  >
                    <Skeleton loading={isLoading || isFetching} active>
                      <Meta title={item.name} description={item.description} />
                    </Skeleton>
                  </Card>
                </Col>
              ))}
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
