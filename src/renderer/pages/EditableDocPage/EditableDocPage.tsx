import { useContext, useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router';
import {
  Affix,
  Avatar,
  Button,
  Checkbox,
  Col,
  Divider,
  Drawer,
  Dropdown,
  Form,
  Input,
  Layout,
  List,
  Menu,
  Modal,
  PageHeader,
  Row,
  Select,
  Skeleton,
  Tooltip,
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LeftOutlined,
  DownOutlined,
  UserOutlined,
  DownloadOutlined,
  EyeOutlined,
  SendOutlined,
  MessageFilled,
  UserAddOutlined,
  LockOutlined,
  AntDesignOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { MainContext } from 'renderer/contexts/MainContext';
import Chat from 'renderer/components/Chat/Chat';
import styled from 'styled-components';
import QuillEditor from './tools/QuillEditor/QuillEditor';
import { onAddContributor } from 'renderer/services/DocumentService';
import { AddContributorForm } from 'renderer/models/DocumentModel';
import { MessageShow } from 'renderer/utils/messages/Messages';
import { onDeleteDocumentContributor, onListDocumentContributor } from 'renderer/services/ContributorService';
const { Option } = Select;


const EditorContainer = styled.div`
  /* background: red !important; */
  width: 100%;
  height: 100vh;
  padding: 0;
  overflow-y: scroll;
  background: ${(props: { theme: { cardBg: any } }) => props.theme.cardBg};
  margin: 0;
  .addContributorBtn {
    position: fixed;
    top: 0.7em;
    right: 5rem;
    z-index: 1;
    width: 24px;
  }
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

const { Header, Content } = Layout;
const user = JSON.parse(localStorage.getItem('user') || '{}');

export default function EditableDocPage({ theme }) {
  const { isRouted , team, documentOnWork } = useContext(MainContext);
  const [isModalListContributorsVisible, setModalListContributorsVisible] = useState(false);

  const [form] = Form.useForm();
  const { id: documentId } = useParams();
  useEffect(() => {
    inPage = isRouted;
    // console.log(inPage);
  }, [isRouted]);
  const history = useHistory();
  console.log(team)
  const [visible, setVisible] = useState(false);
  const [ listContributors , setListContrinutors ] = useState({
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  });

  console.log(documentOnWork)


  const onSuccessAddContributor = () => {
    setIsModalVisible(false);
    MessageShow('success', 'Action in progress');
    reftechLsContributors();
  };
  const onErrorAddContributor = () => {
    MessageShow('error', 'Action in progress');
  };

  const onSuccessLsContributors = (data: any) => {

  }
  const onErrorLsContributors = (error: any) => {

  }
  const { data: lsContributors, refetch: reftechLsContributors } = onListDocumentContributor(onSuccessLsContributors, onErrorLsContributors, Number(documentId));
  console.log(lsContributors)

  const { mutate: addContributor } = onAddContributor(
    onSuccessAddContributor,
    onErrorAddContributor
  );
  const { mutate: removeContributor } = onDeleteDocumentContributor(
    onSuccessAddContributor,
    onErrorAddContributor
  );

  const formAddContributor = ({username, role}) => {
    if (role && username) {
      const contrubutor: AddContributorForm = {
        username,
        role,
        documentId: Number(documentId),
        teamId: team.id,
      };
      addContributor(contrubutor);
    }
  };

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };




  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };


  const showModalLIstContributors = () => {
    setModalListContributorsVisible(true);
  };

  const handleOkModalContrinutors = () => {
    setModalListContributorsVisible(false);
  };

  const handleCancelModalContributors = () => {
    setModalListContributorsVisible(false);
  };

  const removeContributorFromDoc = (contrId: number) => {
    console.log({ contrId, docId: documentId })
    // removeContributor({ contrId, documentId })
  }



  return (
    <>
      <EditorContainer>
        <Content
          className="site-layout-background"
          style={{
            margin: '0px',
            height: '100%',
            background: !isRouted ? 'inherit' : 'transparent',
            marginTop: '48px',
          }}
        >
          {documentOnWork.creator === user?.username && (
            <Button
              type="link"
              block
              className="addContributorBtn"
              onClick={showModal}
            >
              <UserAddOutlined />
            </Button>
          )}

          <QuillEditor id={documentId} />

          <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onCancel={handleCancel}
            onOk={() => {
              form
                .validateFields()
                // eslint-disable-next-line promise/always-return
                .then((values) => {
                  form.resetFields();
                  formAddContributor(values);
                })
                .catch((info) => {
                  console.log('Validate Failed:', info);
                });
            }}
          >
            <Form
              form={form}
              name="add-contributor"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item
                name="username"
                label="Email do utilizador"
                rules={[
                  { required: true, message: 'Please input your Username!' },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="role"
                label="Regra"
                rules={[
                  { required: true, message: 'Please input your Password!' },
                ]}
                initialValue="WRITER"
              >
                <Select defaultValue="WRITER" style={{ width: 120 }}>
                  <Option value="WRITER">Editor</Option>
                  <Option value="REVISER">Revisor</Option>
                  <Option value="READER">Leitor</Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>

          <Affix style={{ position: 'fixed', top: '90%', right: '3%' }}>
            <Button
              style={{ color: 'var(--purple-1)', fontSize: '1.7rem' }}
              size="middle"
              shape="circle"
              type="link"
              onClick={showDrawer}
            >
              <MessageFilled />
            </Button>
          </Affix>

          <Drawer
            title="Basic Drawer"
            placement="right"
            onClose={onClose}
            visible={visible}
          >

            <Row>
              <Col>
              <p
              className="site-description-item-profile-p"
              style={{ marginBottom: 24 }}
            >
              Membros
            </p>
              </Col>
            </Row>
            <Row>
              <Col span={21}>
                <Avatar.Group  maxCount={10} >
                  {
                    lsContributors?.data.length > 0 && lsContributors?.data.map(user => (
                      <Tooltip title={`${user.firstName} ${user.lastName}`} placement="top">
                        <Avatar style={{ backgroundColor: '#87d068' }} src={user.avatar} icon={<UserOutlined />} />
                      </Tooltip>
                    ))
                  }
                </Avatar.Group>
              </Col>
              <Col>
                <Button onClick={showModalLIstContributors} type="link" shape="circle" icon={<EyeOutlined />} />
              </Col>
            </Row>
            <Divider />
            <p className="site-description-item-profile-p">Chat</p>
            <Row>
              <Col span={24}>
                <Chat />
              </Col>
            </Row>
          </Drawer>
        </Content>
        <Modal title="Contribuidores" visible={isModalListContributorsVisible} onOk={handleOkModalContrinutors} onCancel={handleCancelModalContributors} zIndex={1000000} footer={[]}>
        <List
        className="demo-loadmore-list"
        loading={false}
        itemLayout="horizontal"
        dataSource={lsContributors?.data || []}
        renderItem={item => (
          <List.Item
            actions={[ documentOnWork.creator === user?.username && ( <Button onClick={ () => {
              removeContributor({ contrId: item.id, docId: Number(documentId) })
            }} type="link" danger icon={<DeleteOutlined />} />) ]}
          >
            <Skeleton avatar title={false} loading={false} active>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a>{`${item.firstName} ${item.lastName} `} - <small> {item.role} </small> </a>}
              />
            </Skeleton>
          </List.Item>
          )}
        />
      </Modal>
      </EditorContainer>
    </>
  );
}
