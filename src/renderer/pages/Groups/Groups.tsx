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
  Popover,
  Pagination,
  Select,
  Menu,
  Dropdown,
  Tooltip,
} from 'antd';
import {
  TeamOutlined,
  UnorderedListOutlined,
  TableOutlined,
  SmileOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { FaUsers } from '@react-icons/all-files/fa/FaUsers';
import { IoIosDocument } from '@react-icons/all-files/io/IoIosDocument';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MainContext } from 'renderer/contexts/MainContext';
import Picker from 'emoji-picker-react';

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

export default function Groups({ theme, t , setPath }) {
  const { isRouted, defineRoutedState, definePageInfo , defineNavigatedUrl } =
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
  const [emojiSelectInput, setEmojiSelectInput] = useState('');

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
        title: `${chosenEmoji.emoji} ${values.title}`,
        desc: values.description,
        menbers: 0,
        docs: 0,
        teamUrl: '/teste',
      },
    ];
    setTeams([...teams, ...createdTeam]);
    teamArray.push();
    setIsModalVisible(false);
    setChosenEmoji(null);
  };

  const setRoutState = (item: any) => {
    console.log('clicked');
    defineRoutedState(true);
    definePageInfo(item);
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

  const handleButtonClick = (e: any) => {
    console.log('click left button', e);
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

  const btnEmojiTooltip = (
    <Popover content={emojiContainerSelection}>
      <Button type="link">
        <SmileOutlined />
      </Button>
    </Popover>
  );

  return (
    <>
      <div style={{padding: 50}}>

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
          {/* <Form.Item
            style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
            label="emoji"
          >
            <Select
              value={emojiSelectInput}
              style={{ width: 80, margin: '0 8px' }}
            >
              <Option value="rmb">
                <btnEmojiTooltip />
              </Option>
              <Option value="dollar">Dollar</Option>
            </Select>


          </Form.Item> */}
          <Row>
            <Col flex="100px">
              <Form.Item label=".">
                <Dropdown overlay={menu} trigger={['click']}>
                  <Button onClick={e => e.preventDefault()}>
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
      </div>
    </>
  );
}
