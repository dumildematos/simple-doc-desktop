import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  Affix,
  Avatar,
  Button,
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
  Row,
  Select,
  Skeleton,
  Space,
  Tooltip,
} from 'antd';
import {
  UserOutlined,
  EyeOutlined,
  MessageFilled,
  UserAddOutlined,
  AppstoreFilled,
  DeleteOutlined,
  DownOutlined,
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
import React from 'react';
import { FlowEditor } from './tools/flow';
import { saveAs } from 'file-saver';
import { MindEditor } from './tools/mind';
import { KoniEditor } from './tools/koni';
const { Option } = Select;


const EditorContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0;
  overflow-y: scroll;
  background: ${(props: { theme: { cardBg: any } }) => props.theme.cardBg};
  margin: 0;
  .addContributorBtn {
    position: fixed;
    top: 1em;
    right: 5rem;
    z-index: 1;
    width: 24px;
  }
  .exportDropDown {
    position: fixed;
    top: 0.7em;
    right: 8rem;
    z-index: 1;
  }
  .tools-drawer {
    .ant-drawer-body {
      padding: 0;
      display: flex;
      justify-content: center;
    }
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





export default function EditableDocPage({ theme , t }) {
  const { isRouted , team, documentOnWork } = useContext(MainContext);
  const [isModalListContributorsVisible, setModalListContributorsVisible] = useState(false);
  const [draggableToolModal, setDraggableToolModal] = useState({
    visible: false,
    disabled: true,
    type: '',
  });
  const toolsList = [
    {
      avatar: 'https://www.syncfusion.com/blogs/wp-content/uploads/2019/07/Creating-flow-chart.jpg',
      title: 'Flow Editor',
      desc: 'Mil palavras não são tão boas quanto uma imagem, e um fluxograma é uma boa maneira de expressar a ideia de um algoritmo',
      type: 'flow',
    },
      {
      avatar: 'https://media.istockphoto.com/vectors/mind-map-concept-vector-id1133618660?k=20&m=1133618660&s=612x612&w=0&h=K65ClCy00lJLKZZpRxKwSGl3kTs16lsvQf0SLfoSo1A=',
      title: 'Mind Editor',
      desc: 'O mapa cerebral é uma ferramenta de pensamento gráfico eficaz para expressar o pensamento divergente. É simples, mas muito eficaz. É uma ferramenta de pensamento prático.',
      type: 'mind',
    },
      {
      avatar: 'https://cutewallpaper.org/21/cisco-wallpaper/Cisco-Live-KEMOSABE.jpg',
      title: 'Koni Editor',
      desc: 'O diagrama de topologia refere-se ao diagrama de estrutura de rede composto por dispositivos de nós de rede e meios de comunicação.',
      type: 'koni',
    }
  ];

  const draggleRef = React.createRef();
  const [form] = Form.useForm();
  const { id: documentId } = useParams();

  const history = useHistory();
  console.log(team)
  const [visibleChat, setVisibleChat] = useState(false);
  const [visibleTools, setVisibleTools] = useState(false);





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

  const showDrawerChat = () => {
    setVisibleChat(true);
  };
  const onCloseChat = () => {
    setVisibleChat(false);
  };
  const showDrawerTools = () => {
    setVisibleTools(true);
  };
  const onCloseTools = () => {
    setVisibleTools(false);
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



  const showToolsModal = (type) => {
    setVisibleTools(false);
    setDraggableToolModal({ visible: true , type:type})
  }



 const handleCancelToolsModal = e => {
    setDraggableToolModal({
      visible: false,
    });
    setVisibleTools(true);
  };



  const openTool = (type: string) => {
    if(type) {
      showToolsModal(type)
    }
  }



  return (
    <>
      <EditorContainer theme={theme}>
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




          <QuillEditor id={documentId} t={t} />

          <Modal
            title={t('comum.add_contributor')}
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
                  // console.log('Validate Failed:', info);
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
                label={t('comum.user_email')}
                rules={[
                  { required: true, message: t('comum.required_field') },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder={t('comum.user_email')}
                />
              </Form.Item>
              <Form.Item
                name="role"
                label={t('comum.contributor_permission')}
                rules={[
                  { required: true, message: t('comum.required_field') },
                ]}
                initialValue="WRITER"
              >
                <Select defaultValue="WRITER" style={{ width: 120 }}>
                  <Option value="WRITER">{t('comum.writer')}</Option>
                  {/* <Option value="REVISER">Revisor</Option> */}
                  <Option value="READER">{t('comum.reader')}</Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>

          <Affix style={{ position: 'fixed', top: '83%', right: '3%' }}>
            <Button
              style={{ color: '#fff', background: 'var(--purple-1)', border: 'none' }}
              size="middle"
              shape="circle"
              type="primary"
              onClick={showDrawerTools}
            >
              <AppstoreFilled />
            </Button>
          </Affix>
          <Affix style={{ position: 'fixed', top: '90%', right: '3%' }}>
            <Button
              style={{ color: '#fff', background: 'var(--purple-1)', border: 'none' }}
              size="middle"
              shape="circle"
              type="primary"
              onClick={showDrawerChat}
            >
              <MessageFilled />
            </Button>
          </Affix>

          <Drawer
            title="Basic Drawer"
            placement="right"
            onClose={onCloseChat}
            visible={visibleChat}
          >

            <Row>
              <Col>
              <p
              className="site-description-item-profile-p"
              style={{ marginBottom: 24 }}
            >
              {t('comum.members')}
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
              {
                lsContributors?.data.length > 0 && <Button onClick={showModalLIstContributors} type="link" shape="circle" icon={<EyeOutlined />} />
              }
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
          <Drawer
            title="Tools"
            placement="right"
            onClose={onCloseTools}
            visible={visibleTools}
            className="tools-drawer"
          >

              <List
                className="tools-list"
                loading={false}
                itemLayout="horizontal"
                // loadMore={loadMore}
                dataSource={toolsList}
                renderItem={item => (
                  <List.Item
                    // actions={[<a key="list-loadmore-more" onClick={() => openTool(item.type)}>create</a>]}
                    onClick={() => openTool(item.type)}
                  >
                    <Skeleton avatar title={false} loading={false} active>
                      <List.Item.Meta
                        avatar={<Avatar shape="square" size={64} src={item.avatar} />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description={item.desc}
                      />
                    </Skeleton>
                  </List.Item>
                )}
              />


          </Drawer>
          <Drawer
            title={draggableToolModal.type}
            placement="right"
            size={'large'}
            onClose={handleCancelToolsModal}
            visible={draggableToolModal.visible}
            extra={
              <Space>
                <Button onClick={handleCancelToolsModal}>Cancel</Button>
                <Button type="primary" onClick={handleCancelToolsModal}>
                  OK
                </Button>
                <Button type="primary" onClick={() => {

                    let canvas = document.getElementsByClassName('graph-container')[0].getElementsByTagName('canvas')[0];
                    canvas?.toBlob(function(blob: string | Blob) {
                        saveAs(blob, `${draggableToolModal.type}.png`);
                    });

                }}>
                  Save as PNG
                </Button>
              </Space>
            }
          >
            { draggableToolModal.type === 'flow' && <FlowEditor /> }
            { draggableToolModal.type === 'mind' && <MindEditor /> }
            { draggableToolModal.type === 'koni' && <KoniEditor /> }

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
