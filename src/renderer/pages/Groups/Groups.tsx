import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Skeleton,
  Modal,
  Space,
  Table,
  Pagination,
  Select,
  Menu,
  Dropdown,
} from 'antd';
import {
  TeamOutlined,
  UnorderedListOutlined,
  TableOutlined,
  SmileOutlined,
  DownOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { FaUsers } from '@react-icons/all-files/fa/FaUsers';
import { IoIosDocument } from '@react-icons/all-files/io/IoIosDocument';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { MainContext } from 'renderer/contexts/MainContext';
import Picker from 'emoji-picker-react';
import { getUserTeams, onCreateTeam } from 'renderer/services/TeamsService';
import { TeamAddForm } from 'renderer/models/TeamModel';

const { Meta } = Card;
const { TextArea } = Input;
const { Option } = Select;

const ModalLayout = styled(Modal)`
  .ant-modal-content {
    background: ${(props: { theme: { modalBg: any } }) => props.theme.modalBg};
    .ant-modal-header {
      background: ${(props: { theme: { modalBg: any } }) =>
        props.theme.modalBg};
      border-color: ${(props: { theme: { modalInnerBorderColor: any } }) =>
        props.theme.modalInnerBorderColor};
      .ant-modal-title {
        color: ${(props: { theme: { modalInputColor: any } }) =>
          props.theme.modalInputColor} !important;
      }
    }
    .ant-modal-body {
      label {
        color: ${(props: { theme: { modalInputColor: any } }) =>
          props.theme.modalInputColor} !important;
      }
      .ant-input {
        background: ${(props: { theme: { modalBgInput: any } }) =>
          props.theme.modalBgInput} !important;
        border: ${(props: { theme: { modalInputBorder: any } }) =>
          props.theme.modalInputBorder};
        color: ${(props: { theme: { modalInputColor: any } }) =>
          props.theme.modalInputColor} !important;
      }
    }
    .ant-modal-footer {
      border-color: ${(props: { theme: { modalInnerBorderColor: any } }) =>
        props.theme.modalInnerBorderColor};
      button.ant-btn.ant-btn-primary {
        background-color: var(--purple-1);
        border: none;
      }
    }
  }
`;

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
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: (tags: any[]) => (
  //     <>
  //       {tags.map((tag: React.Key | null | undefined) => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'loser') {
  //           color = 'volcano';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
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
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const hasAcessToken = localStorage.getItem('access_token');
export default function Groups({ theme, t, setPath }) {
  const history = useHistory();

  const { isRouted, defineRoutedState, definePageInfo, defineBackButton } =
    useContext(MainContext);
  const [form] = Form.useForm();
  const teamArray = [
    {
      id: 1,
      title: 'Time SonaGas',
      desc: 'description',
      menbers: 20,
      docs: 23,
      teamUrl: '/teste',
    },
    {
      id: 2,
      title: 'Slack Team 1',
      desc: 'description',
      menbers: 90,
      docs: 23,
      teamUrl: '/teste',
    },
    {
      id: 3,
      title: 'Zoom Teams',
      desc: 'description',
      menbers: 120,
      docs: 23,
      teamUrl: '/teste',
    },
    {
      id: 4,
      title: 'Discord Teams',
      desc: 'description',
      menbers: 220,
      docs: 23,
      teamUrl: '/teste',
    },
  ];
  const [teams, setTeams] = useState(teamArray);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [viewAs, setChangeView] = useState('grid');
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onCreateError = () => {};

  const onSuccess = () => {
    console.log(teamList);
  };

  const onError = () => {
    console.log(teamList);
  };

  const {
    data: teamList,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = getUserTeams(onSuccess, onError);

  const onCreateSuccess = () => {
    refetch();
  };

  const { mutate: createTeam } = onCreateTeam(onCreateSuccess, onCreateError);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onChangeInput = (e: any) => {
    // console.log(e);
  };

  const onCancel = () => {
    setIsModalVisible(false);
  };

  const onChangeView = (e: any) => {
    setChangeView(e.target.value);
  };

  const onCreateGroup = (values: any) => {
    console.log(values);

    const team: TeamAddForm = {
      name: chosenEmoji ? `${chosenEmoji.emoji} ${values.title}` : values.title,
      description: values.description,
      banner: '',
      type: 'PRIVATE',
    };

    createTeam(team);

    // setTeams([...teams, ...createdTeam]);
    // teamArray.push();
    setIsModalVisible(false);
    setChosenEmoji(null);
  };

  const setRoutState = (item: any) => {
    console.log('clicked');
    defineRoutedState(true);
    definePageInfo(item.id);
  };

  const onEmojiClick = (
    _event: any,
    emojiObject: React.SetStateAction<any>
  ) => {
    console.log(emojiObject);
    console.log(form.getFieldValue('title'));
    console.log(form);
    form.setFieldsValue(form.getFieldValue('title') + emojiObject.emoji);
    setChosenEmoji(emojiObject);
  };

  const handleMenuClick = (e: any) => {
    console.log('click', e);
    console.log(chosenEmoji);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        <div>
          {chosenEmoji ? (
            <span>You chose: {chosenEmoji.emoji}</span>
          ) : (
            <span>No emoji Chosen</span>
          )}
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      </Menu.Item>
    </Menu>
  );

  const navigateToTeam = (team: { id: any }) => {
    if (team) {
      defineBackButton({
        state: true,
        title: team.name,
        subtitle: '',
      });
      setTimeout(() => {
        history.push(`/group/${team.id}`);
      }, 1000);
      // setRoutState(team);
    }
  };

  const onShowPageSizeChange = (current, pageSize)  => {
    console.log(current, pageSize);
  };

  return (
    <>
      <div style={{ padding: 50 }}>
        <Row justify="end">
          <Col span={4}>
            <Button
              icon={<TeamOutlined />}
              className="btn-action"
              style={{ marginTop: '15px' }}
              onClick={showModal}
            >
              {t('home.new_team')}
            </Button>
          </Col>
          <Divider />
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
        {teamList?.data.totalElements}
        {viewAs === 'grid' && (
          <Row
            className="cards-container"
            gutter={[8, 8]}
            style={{
              paddingTop: '10px',
            }}
          >
            {teamList?.data.content.map((item, index) => (
              <Col key={item.id} span={8} >
                <Card
                  style={{ width: '100%' }}
                  onClick={() => navigateToTeam(item)}
                  actions={[
                    // eslint-disable-next-line react/jsx-key
                    [<FaUsers />, <span>{item.menbers}</span>],
                    // eslint-disable-next-line react/jsx-key
                    [<IoIosDocument />, <span>{item.docs}</span>],
                  ]}
                  className="teams-card"
                >
                  <Skeleton loading={isLoading || isFetching} active>
                    <Meta title={item.name} description={item.description} />
                  </Skeleton>
                </Card>
              </Col>
            ))}
          </Row>
        )}
        {viewAs === 'grid' && teamList?.data&&  (
          <Row style={{ marginTop: '2rem' }}>
            <Col>
              <Pagination
                showSizeChanger
                onShowSizeChange={onShowPageSizeChange}
                onChange={onShowPageSizeChange}
                pageSize={teamList?.data.totalPages}
                total={teamList?.data.totalElements}
              />
            </Col>
          </Row>
        )}
        {viewAs === 'list' && (
          <Row className="cards-container" style={{ paddingTop: '10px' }}>
            <Col span={24}>
              <Table columns={tableColumns} dataSource={teams} />
            </Col>
          </Row>
        )}
        <ModalLayout
          theme={theme}
          visible={isModalVisible}
          title="Create a new collection"
          okText="Create"
          cancelText="Cancel"
          onCancel={onCancel}
          onOk={() => {
            form
              .validateFields()
              // eslint-disable-next-line promise/always-return
              .then((values) => {
                form.resetFields();
                onCreateGroup(values);
              })
              .catch((info) => {
                console.log('Validate Failed:', info);
              });
          }}
        >
          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={{
              modifier: 'public',
            }}
          >
            <Row>
              <Col flex="100px">
                <Form.Item label=".">
                  <Dropdown overlay={menu} trigger={['click']}>
                    <Button onClick={(e) => e.preventDefault()}>
                      {chosenEmoji ? chosenEmoji.emoji : <SmileOutlined />}
                      <DownOutlined />
                    </Button>
                  </Dropdown>
                </Form.Item>
              </Col>
              <Col flex="auto">
                <Form.Item
                  name="title"
                  label="Nome da equipe"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the title of collection!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="type"
              label="Selecione o tipo"
              rules={[
                {
                  required: true,
                  message: 'Please input the title of collection!',
                },
              ]}
            >
              <Radio.Group defaultValue="PRIVATE" buttonStyle="solid">
                <Radio.Button value="PUBLIC">Público</Radio.Button>
                <Radio.Button value="PRIVATE">Privado</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="description"
              label="Descrição"
              rules={[
                {
                  required: true,
                  message: 'Please input the title of collection!',
                },
              ]}
            >
              <TextArea
                placeholder="textarea with clear icon"
                allowClear
                onChange={onChangeInput}
              />
            </Form.Item>
          </Form>
        </ModalLayout>
      </div>
    </>
  );
}
