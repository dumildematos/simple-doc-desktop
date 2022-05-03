import React, { useContext, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Modal,
  Space,
  Table,
  Pagination,
  Menu,
  Dropdown,
  Empty,
  Upload,
  Avatar,
  List,
  Tooltip,
  Typography,
} from 'antd';
import {
  TeamOutlined,
  UnorderedListOutlined,
  TableOutlined,
  SmileOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { MainContext } from 'renderer/contexts/MainContext';
import Picker from 'emoji-picker-react';
import {
  getUserTeams,
  onCreateTeam,
  onDeleteTeam,
} from 'renderer/services/TeamsService';
import { TeamAddForm } from 'renderer/models/TeamModel';
import { FaGlobeAfrica } from '@react-icons/all-files/fa/FaGlobeAfrica';
import { FaLock } from '@react-icons/all-files/fa/FaLock';
import ImgCrop from 'antd-img-crop';
import { MessageShow } from 'renderer/utils/messages/Messages';

import moment from 'moment';

const { TextArea } = Input;
const { confirm } = Modal;
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
const { Paragraph } = Typography;

export default function Groups({ theme, t }) {
  const history = useHistory();
  console.log(t)
  const {
    isRouted,
    defineRoutedState,
    definePageInfo,
    defineBackButton,
    defineTeam,
  } = useContext(MainContext);
  const [tabledTeamList, setTableLIstTeam] = useState([]);
  const [form] = Form.useForm();

  const [bannerInput, setBannerInput] = useState([]);

  const tableColumns = [
    {
      title: t('comum.name'),
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
      title: t('comum.visibility'),
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: t('comum.members'),
      dataIndex: 'members',
      key: 'members',
    },
    {
      title: t('comum.documents'),
      dataIndex: 'docs',
      key: 'docs',
    },
    {
      title: t('comum.action'),
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
          <a onClick={() => navigateToTeam(record)}>{t('comum.enter')}</a>
          <a
            onClick={() => {
              showDeleteConfirm(record);
            }}
          >
            {t('comum.delete')}
          </a>
        </Space>
      ),
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [viewAs, setChangeView] = useState('grid');
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [currentPag, setCurrentPag] = useState(1);

  const onCreateError = () => {
    MessageShow('error', t('comum.an_error_occurred_in_the_operation'));
  };

  function showDeleteConfirm(team) {
    confirm({
      title: t('comum.are_you_sure_delete_this_register'),
      icon: <ExclamationCircleOutlined />,
      content: t('comum.if_deleted_the_register_wont_be_recoverd'),
      okText: t('comum.yes'),
      okType: 'danger',
      cancelText: t('comum.no'),
      onOk() {
        if (team.docs === 0) {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          deleteTeam(team.id);
        } else {
          MessageShow('error', t('comum.an_error_occurred_in_the_operation'));
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const onSuccess = (data) => {
    console.log(data);
    setTableLIstTeam(
      data?.data?.content.map((team) => {
        return {
          id: team.id,
          key: team.id,
          title: team.name,
          members: team.contributors.length,
          desc: team.description,
          type: team.type === 'PRIVATE' ? <FaLock /> : <FaGlobeAfrica />,
          docs: team.documents.length,
        };
      })
    );
    // defineBackButton({
    //   state: false,
    //   title: '',
    //   subtitle: '',
    //   prevPath: '/',
    // });
  };

  const onError = (data) => {
    Modal.info({
      title: 'This is a notification message',
      content: (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      ),
      onOk() {
        localStorage.clear();
        window.location.href = '/';
        console.log(data);
      },
    });
  };

  const {
    data: teamList,
    isLoading,
    isFetching,
    isError: isErrorOnlist,
    error,
    refetch: reFetchTeams,
  } = getUserTeams(onSuccess, onError, currentPag);

  const onCreateSuccess = (data) => {
    // console.log(data)
    MessageShow('success', t('comum.successfully_created'));
    reFetchTeams();
  };

  if (isErrorOnlist) {
    localStorage.clear();
    window.location.href = '/';
  }

  const { mutate: createTeam } = onCreateTeam(onCreateSuccess, onCreateError);
  const { mutate: deleteTeam } = onDeleteTeam(onCreateSuccess, onCreateError);

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
      banner: bannerInput[0].thumbUrl,
      type: values.type,
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
    // console.log('click', e);
    console.log(chosenEmoji);
  };

  const onChangePagination = (page) => {
    console.log(page);
    setCurrentPag(page);
  };

  const menu = (
    // <Button type="primary" shape="circle" icon={<SearchOutlined />} />
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
        title: team.name || team.title,
        subtitle: '',
        prevPath: '/',
      });
      defineTeam(team);
      setTimeout(() => {
        history.push(`/group/${team.id}`);
      }, 1000);
    }
  };

  const onShowPageSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  const onChangeBanner = ({ fileList: newFileList }) => {
    console.log(newFileList);
    setBannerInput(newFileList);
  };

  const onPreviewBannerImage = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
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
      <div
        style={{
          padding: 50,
          height: '100vh',
          boxSizing: 'border-box',
          overflow: 'auto',
        }}
      >
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
          <>
            <Row
              className="cards-container"
              gutter={24}
              style={{
                paddingTop: '10px',
                overflowY: 'hidden',
              }}
            >
              {teamList?.data?.totalElements === 0 && (
                <Col span={24}>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </Col>
              )}
              {teamList?.data?.totalElements > 0 && (
                <div className="cardList" style={{ width: '100%' }}>
                  {cardListTeam}
                </div>
              )}
            </Row>
          </>
        )}
        {teamList?.data?.totalElements > 0 &&
          viewAs === 'grid' &&
          teamList?.data && (
            <Row style={{ marginTop: '2rem' }}>
              <Col>
                <Pagination
                  current={currentPag}
                  onChange={onChangePagination}
                  total={teamList?.data.totalElements}
                  pageSize={teamList?.data.size}
                />
              </Col>
            </Row>
          )}
        {teamList?.data?.totalElements === 0 && viewAs === 'list' && (
          <Col span={24}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Col>
        )}
        {teamList?.data?.totalElements > 0 && viewAs === 'list' && (
          <Row className="cards-container" style={{ paddingTop: '10px' }}>
            <Col span={24}>
              <Table columns={tableColumns} dataSource={tabledTeamList} />
            </Col>
          </Row>
        )}
        <ModalLayout
          theme={theme}
          visible={isModalVisible}
          title={t('home.modal_create_team.create_new_team_work')}
          okText={t('comum.create')}
          cancelText={t('comum.cancel')}
          onCancel={onCancel}
          onOk={() => {
            form
              .validateFields()
              // eslint-disable-next-line promise/always-return
              .then((values) => {
                onCreateGroup(values);
                form.resetFields();
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
                  label={t('home.modal_create_team.team_name')}
                  rules={[
                    {
                      required: true,
                      message: t('home.modal_create_team.required_field'),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="type"
              label={t('home.modal_create_team.team_visibility')}
              initialValue="PRIVATE"
              rules={[
                {
                  required: true,
                  message: t('home.modal_create_team.required_field'),
                },
              ]}
            >
              <Radio.Group defaultValue="PRIVATE" buttonStyle="solid">
                <Radio.Button value="PUBLIC">{t('comum.public')}</Radio.Button>
                <Radio.Button value="PRIVATE">{t('comum.private')}</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="banner"
              label={t('home.modal_create_team.image_cover')}
              rules={[
                {
                  required: !(bannerInput.length > 0),
                  message: t('home.modal_create_team.required_field'),
                },
              ]}
            >
              <ImgCrop rotate>
                <Upload
                  listType="picture-card"
                  fileList={bannerInput}
                  onChange={onChangeBanner}
                  onPreview={onPreviewBannerImage}
                >
                  {bannerInput.length < 1 && '+ Upload'}
                </Upload>
              </ImgCrop>
            </Form.Item>
            <Form.Item
              name="description"
              label={t('comum.description')}
              rules={[
                {
                  required: true,
                  message: t('home.modal_create_team.required_field'),
                },
              ]}
            >
              <TextArea
                placeholder={t(
                  'home.modal_create_team.write_teams_drescription'
                )}
                allowClear
                showCount
                maxLength={400}
                onChange={onChangeInput}
              />
            </Form.Item>
          </Form>
        </ModalLayout>
      </div>
    </>
  );
}
