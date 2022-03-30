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
  Alert,
  Empty,
  Upload,
} from 'antd';
import {
  TeamOutlined,
  UnorderedListOutlined,
  TableOutlined,
  SmileOutlined,
  DownOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { FaUsers } from '@react-icons/all-files/fa/FaUsers';
import { IoIosDocument } from '@react-icons/all-files/io/IoIosDocument';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { MainContext } from 'renderer/contexts/MainContext';
import Picker from 'emoji-picker-react';
import { getUserTeams, onCreateTeam } from 'renderer/services/TeamsService';
import { TeamAddForm } from 'renderer/models/TeamModel';
import { FaGlobeAfrica } from '@react-icons/all-files/fa/FaGlobeAfrica';
import { FaLock } from '@react-icons/all-files/fa/FaLock';
import ImgCrop from 'antd-img-crop';
const { Meta } = Card;
const { TextArea } = Input;
const { Option } = Select;
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

const hasAcessToken = localStorage.getItem('access_token');
export default function Groups({ theme, t, setPath }) {
  const history = useHistory();

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
          <a onClick={() => {showDeleteConfirm(record)}}>Delete</a>
        </Space>
      ),
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [viewAs, setChangeView] = useState('grid');
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [currentPag, setCurrentPag] = useState(1);

  const onCreateError = () => {};


  function showDeleteConfirm(team) {
    console.log(team)
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const onSuccess = (data) => {
    console.log(data);
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
  };

  const onError = (data) => {
    localStorage.clear();
    window.location.href = '/';
    console.log(data);
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
    reFetchTeams();
  };

  if (isErrorOnlist) {
    localStorage.clear();
    window.location.href = '/';
  }

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
    console.log('click', e);
    console.log(chosenEmoji);
  };

  const onChangePagination = (page) => {
    console.log(page);
    setCurrentPag(page);
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
        {viewAs === 'grid' && (
          <Row
            className="cards-container"
            gutter={[8, 8]}
            style={{
              paddingTop: '10px',
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
                      [
                        item.type === 'PRIVATE' ? (
                          <FaLock />
                        ) : (
                          <FaGlobeAfrica />
                        ),
                      ],
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
          </Row>
        )}
        {teamList?.data.totalElements > 0 &&
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
              initialValue="PRIVATE"
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
              name="banner"
              label="Cover do grupo"
              rules={[
                {
                  required: !(bannerInput.length > 0),
                  message: 'Please input the title of collection!',
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
