import React, { useContext, useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  Col,
  Modal,
  Row,
  Tooltip,
  Collapse,
  Tree,
  notification,
  Dropdown,
  Menu,
} from 'antd';
import { Link, useHistory, useParams, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { BsPencil } from '@react-icons/all-files/bs/BsPencil';
import { HiOutlineDocumentAdd } from '@react-icons/all-files/hi/HiOutlineDocumentAdd';
import {
  AntDesignOutlined,
  CarryOutOutlined,
  DeleteFilled,
  FileFilled,
  FileTextOutlined,
  FormOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { MainContext } from 'renderer/contexts/MainContext';
import { onListCategory } from 'renderer/services/CategoryService';
import { onGetTemplates } from 'renderer/services/TemplateService';
import {
  getDocumentsOfTeam,
  onCreateDocument,
} from 'renderer/services/DocumentService';
import { CreateDocument } from 'renderer/models/DocumentModel';
import { ipcRenderer } from 'electron';

const { Meta } = Card;
const { Panel } = Collapse;
const { DirectoryTree } = Tree;

const GroupContainer = styled.div`
  /* background: red !important; */
  width: 100%;
  height: 100vh;
  padding: 50px;
  background: ${(props: { theme: { cardBg: any } }) => props.theme.boxBg};
  margin: 0;
  .ant-row {
    &.main {
      height: 100%;
    }
    .bannerToolBar {
      background: rgba(0, 0, 0, 0.5);
      .ant-col {
        background: transparent !important;
        h3,
        button {
          color: #fff !important;
        }
      }
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
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 5px;
        cursor: pointer;
        &:hover {
          background: #97959526;
          transition: 1s;
        }
        &.disable {
          background: #f3f3f3;
          span.anticon.anticon-file-text {
            color: #a9a1a4;
          }
        }

        .doc-item {
          background-color: blue;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .ant-card-meta {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            span.ant-avatar.ant-avatar-circle.ant-avatar-icon {
              background: red !important;
            }
            .ant-card-meta-detail {
              margin-top: 15px;
              .ant-card-meta-title {
                font-size: 0.47rem;
              }
            }
          }
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

const user = JSON.parse(localStorage.getItem('user'));

export default function Group(props: any) {
  // console.log('detail group');
  // eslint-disable-next-line react/destructuring-assignment
  const {
    definedEditorIsOpened,
    groupPage,
    team,
    defineBackButton,
    defineDocument,
  } = useContext(MainContext);
  const [currentCollapsedId, setCollpasedId] = useState(0);
  const [treeTemplate, setTreeTemplate] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const { id: teamId } = useParams();
  const history = useHistory();

  const [isModalSelectTypeDoc, setIsModalSelectTypeDoc] = useState(false);

  const onSuccessCategoryList = () => {};
  const onErrorategoryList = () => {};

  const { data: lstCategory, refetch: getCategoryList } = onListCategory(
    onSuccessCategoryList,
    onErrorategoryList,
    false
  );

  const onSuccessTemplate = (data: any) => {
    // console.log(data);
    setTreeTemplate(
      data?.data.content.map((template: { name: string; id: number }) => {
        return {
          title:
            template.name.length >= 10
              ? `${template.name.substring(0, template.name.length - 10)}...`
              : template.name,
          key: template.id,
          icon: <FileTextOutlined />,
          content: template.content,
        };
      })
    );
  };

  const { refetch: getTemplateList } = onGetTemplates(
    onSuccessTemplate,
    onErrorategoryList,
    currentCollapsedId
  );

  const onDocumentListSuccess = () => {};
  const onDocumentListError = () => {};

  const { data: documentList, refetch: refetchDocuments } = getDocumentsOfTeam(
    onDocumentListSuccess,
    onDocumentListError,
    Number(teamId)
  );

  const onCreateDocumentSuccess = () => {
    refetchDocuments();
  };
  const onCreateDocumentError = () => {};

  const { mutate: createDocument } = onCreateDocument(
    onCreateDocumentSuccess,
    onCreateDocumentError
  );

  console.log(documentList);

  const modalSelecTypeHandleOk = () => {
    setIsModalSelectTypeDoc(false);
  };

  const modalSelecTypeHandleCancel = () => {
    setIsModalSelectTypeDoc(false);
  };

  const modalSelecTypeShowModal = () => {
    setIsModalSelectTypeDoc(true);
  };

  const onChangeCollapse = (key: number) => {
    if (key) {
      setCollpasedId(Number(key));
      console.log(currentCollapsedId);
      getTemplateList();
    }
  };

  const onSelectTree = (keys: React.Key[], info: any) => {
    console.log('Trigger Select', keys, info);
    setSelectedTemplate(info);
  };

  const onExpand = () => {
    console.log('Trigger Expand');
  };

  const isContributor = (arr: any[]) => {
    if (user) {
      return arr.find((el: { username: any }) => el.username === user.username);
    }
  };

  const openDocument = (document) => {
    if (
      document.creator === user.username ||
      isContributor(document.contributors)
    ) {
      defineBackButton({
        state: true,
        title: team.name || team.title,
        subtitle: document.name,
        prevPath: window.location.pathname,
      });
      defineDocument(document);
      setTimeout(() => {
        history.push(`/page-doc/${document.id}`);
      }, 0);
    } else {
      notification.warning({
        message: 'Alerta',
        description: 'Você não possui permissão para abrir este documento',
      });
    }
  };

  const handleDocRightClick = (document) => {};

  const openLocalFile = () => {
    window.electron.ipcRenderer.openDialog();
    
  };
  window.electron.ipcRenderer.on('opened-file', (args) => {

    console.log(args)
  });

  // electron.ipcRenderer.on('selected-directory', (event, path) => {

  // })

  const documentMenu = (
    <Menu>
      <Menu.Item key="1">Rename</Menu.Item>
      <Menu.Item key="2" danger icon={<DeleteFilled />}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <GroupContainer theme={props.theme}>
      <Row
        justify="space-between"
        className="main"
        style={{ marginTop: '1rem' }}
      >
        <Col span={8} className="main">
          <div
            style={{
              height: '160px',
              backgroundImage: `url(${team.banner})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <Row
              justify="space-between"
              className="bannerToolBar"
              style={{ height: 'auto' }}
            >
              <Col>
                <h3>Detalhes da equipe</h3>
              </Col>
              <Col>
                <Button type="link" size="small" className="btn-action-pmd">
                  <BsPencil />
                </Button>
              </Col>
            </Row>
          </div>
          <Row style={{ height: 'auto' }}>
            {/* <Col span={24}>
              <h4>{team.name}</h4>
            </Col> */}
            <Col span={24}>
              <p>{team.description}</p>
            </Col>
          </Row>
          <Row style={{ height: 'auto' }}>
            <Col span={24}>
              <h3>Membros</h3>
            </Col>
            <Col span={24}>
              <Avatar.Group>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                <Tooltip title="Ant User" placement="top">
                  <Avatar
                    style={{ backgroundColor: '#87d068' }}
                    icon={<UserOutlined />}
                  />
                </Tooltip>
                <Avatar
                  style={{ backgroundColor: '#1890ff' }}
                  icon={<AntDesignOutlined />}
                />
              </Avatar.Group>
            </Col>
          </Row>
        </Col>
        <Col span={15} className="main">
          <Row justify="space-between" style={{ height: 'auto' }}>
            <Col>{/* <h4>Detalhes da equipe</h4> */}</Col>

            <Col>
              <Button
                type="link"
                size="small"
                className="btn-action-pmd"
                onClick={() => {
                  openLocalFile();
                  // getCategoryList();
                  // modalSelecTypeShowModal();
                }}
              >
                <p>
                  Open Document &nbsp;
                  <HiOutlineDocumentAdd />
                </p>
              </Button>
              <Button
                type="link"
                size="small"
                className="btn-action-pmd"
                onClick={() => {
                  getCategoryList();
                  modalSelecTypeShowModal();
                }}
              >
                <p>
                  New Document &nbsp;
                  <HiOutlineDocumentAdd />
                </p>
              </Button>
            </Col>
          </Row>
          <Row
            style={{ height: 'auto', maxHeight: '90%', overflowY: 'scroll' }}
          >
            {documentList?.data.numberOfElements === 0 && 'Empty'}

            {documentList?.data.numberOfElements > 0 &&
              documentList?.data.content.map((document) => {
                return (
                  <Dropdown overlay={documentMenu} trigger={['contextMenu']}>
                    <Col
                      span={4}
                      key={document.id}
                      className="doc-ls"
                      className={
                        document.creator === user?.username ||
                        isContributor(document.contributors)
                          ? 'doc-ls'
                          : 'doc-ls disable'
                      }
                    >
                      <div onClick={() => openDocument(document)}>
                        <Button type="link" block style={{ fontSize: '2rem' }}>
                          <FileTextOutlined />
                        </Button>
                      </div>
                      {document.name}
                    </Col>
                  </Dropdown>
                );
              })}
          </Row>
        </Col>
      </Row>

      <Modal
        className="modal-new-doc"
        title="Novo Documento"
        visible={isModalSelectTypeDoc}
        onOk={modalSelecTypeHandleOk}
        onCancel={modalSelecTypeHandleCancel}
        footer={null}
        width={800}
        bodyStyle={{
          maxHeight: '400px',
          height: '400px',
          padding: '0',
        }}
      >
        <Row>
          <Col flex="600" className="previewTemplate">
            {selectedTemplate && selectedTemplate.node
              ? selectedTemplate.node.content
              : 'empty'}
          </Col>
          <Col
            flex="200px"
            className="collapseSelect"
            style={{ overflow: 'hidden' }}
          >
            <div className="useTemplateBx">
              <Button
                type="primary"
                block
                onClick={() => {
                  console.log(selectedTemplate);
                  console.log(teamId);

                  const form: CreateDocument = {
                    name: 'Untitled',
                    content: '{[]}',
                    type: 'PRIVATE',
                    teamId: Number(teamId),
                    templateId: selectedTemplate?.node
                      ? selectedTemplate.node.key
                      : null,
                  };
                  createDocument(form);
                }}
              >
                Create
              </Button>
            </div>
            <Collapse
              accordion
              bordered={false}
              defaultActiveKey={['1']}
              style={{ height: '100%', overflowY: 'scroll' }}
              onChange={(e) => onChangeCollapse(e)}
            >
              <Panel header="My Templates" key="0">
                {/* {text} */}
              </Panel>
              {lstCategory?.data.content.map((item) => (
                <Panel header={item.name} key={item.id}>
                  <DirectoryTree
                    multiple
                    defaultExpandAll
                    onSelect={onSelectTree}
                    onExpand={onExpand}
                    treeData={treeTemplate}
                  />
                </Panel>
              ))}
            </Collapse>
          </Col>
        </Row>
      </Modal>
    </GroupContainer>
  );
}
