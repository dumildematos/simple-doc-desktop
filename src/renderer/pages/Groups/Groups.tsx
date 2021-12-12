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
  Layout,
  Tag,
  Space,
  Table,
  Popover,
  Pagination,
} from 'antd';
import {
  TeamOutlined,
  UnorderedListOutlined,
  TableOutlined,
  SettingOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { FaUsers } from '@react-icons/all-files/fa/FaUsers';
import { IoIosDocument } from '@react-icons/all-files/io/IoIosDocument';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MainContext } from 'renderer/contexts/MainContext';
import Picker from 'emoji-picker-react';

const { Meta } = Card;
const { TextArea } = Input;

const ModalLayout = styled(Modal)`
  .ant-modal-content {
    background: ${(props) => props.theme.modalBg};
    .ant-modal-header {
      background: ${(props) => props.theme.modalBg};
      border-color: ${(props) => props.theme.modalInnerBorderColor};
      .ant-modal-title {
        color: ${(props) => props.theme.modalInputColor} !important;
      }
    }
    .ant-modal-body {
      label {
        color: ${(props) => props.theme.modalInputColor} !important;
      }
      .ant-input {
        background: ${(props) => props.theme.modalBgInput} !important;
        border: ${(props) => props.theme.modalInputBorder};
        color: ${(props) => props.theme.modalInputColor} !important;
      }
    }
    .ant-modal-footer {
      border-color: ${(props) => props.theme.modalInnerBorderColor};
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

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
    membros: 12,
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default function Groups({ theme, t }) {
  const { isRouted, defineRoutedState, definePageInfo } =
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

  useEffect(() => {
    // anchorRef();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onChangeInput = (e: any) => {
    console.log(e);
  };

  const onCancel = () => {
    setIsModalVisible(false);
  };

  const onChangeView = (e: any) => {
    setChangeView(e.target.value);
  };

  const onCreateGroup = (values: any) => {
    console.log(values);
    const createdTeam = [
      {
        id: Math.floor(Math.random(10) * 1000),
        title: values.title,
        desc: values.description,
        menbers: 0,
        docs: 0,
        teamUrl: '/teste',
      },
    ];
    setTeams([...teams, ...createdTeam]);
    teamArray.push();
    setIsModalVisible(false);
  };

  const setRoutState = (item: any) => {
    console.log('clicked');
    defineRoutedState(true);
    definePageInfo(item);
  };

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    console.log(form.getFieldValue('title'));
    console.log(form);
    form.setFieldsValue(form.getFieldValue('title') + emojiObject.emoji);
    setChosenEmoji(emojiObject);
  };

  const emojiContainerSelection = (
    <div>
      {chosenEmoji ? (
        <span>You chose: {chosenEmoji.emoji}</span>
      ) : (
        <span>No emoji Chosen</span>
      )}
      <Picker onEmojiClick={onEmojiClick} />
    </div>
  );

  const btnEmojiTooltip = (
    <Popover content={emojiContainerSelection}>
      <Button type="link">
        <SmileOutlined />
      </Button>
    </Popover>
  );

  return (
    <>
      <Row justify="end">
        <Col span={4}>
          <Button
            icon={<TeamOutlined />}
            className="btn-action"
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
      {viewAs === 'grid' && (
        <Row
          className="cards-container"
          gutter={[8, 8]}
          style={{
            paddingTop: '10px',
          }}
        >
          {teams.map((item, index) => (
            <Col key={item.id} span={8}>
              <Link to={`/group/${item.id}`} onClick={() => setRoutState(item)}>
                <Card
                  style={{ width: '100%' }}
                  actions={[
                    // eslint-disable-next-line react/jsx-key
                    [<FaUsers />, <span>{item.menbers}</span>],
                    // eslint-disable-next-line react/jsx-key
                    [<IoIosDocument />, <span>{item.docs}</span>],
                  ]}
                  className="teams-card"
                >
                  <Skeleton loading={false} active>
                    <Meta title={item.title} description={item.desc} />
                  </Skeleton>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
      {viewAs === 'grid' && (
        <Row>
          <Col>
            <Pagination defaultCurrent={1} total={50} />
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
          {/* <Form.Item
    name="description"
    label="Descrição"
    rules={[
      {
        required: true,
        message: 'Please input the title of collection!',
      },
    ]}
  >
    {hashes.inputVisible && (
      <Input
        ref={saveInputRef}
        type="text"
        size="small"
        style={{ width: 78 }}
        value={hashes.inputValue}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
      />
    )}
    {!hashes.inputVisible && (
      <Tag onClick={showInput} className="site-tag-plus">
        <PlusOutlined /> New Tag
      </Tag>
    )}
  </Form.Item> */}
        </Form>
      </ModalLayout>
    </>
  );
}
