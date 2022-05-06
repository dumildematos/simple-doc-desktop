import React, { useContext, useState } from 'react';
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
  Form,
  Input,
  Radio,
  Upload,
  Empty,
} from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { BsPencil } from '@react-icons/all-files/bs/BsPencil';
import { HiOutlineDocumentAdd } from '@react-icons/all-files/hi/HiOutlineDocumentAdd';
import {
  DeleteFilled,
  DownOutlined,
  ExclamationCircleOutlined,
  FileProtectOutlined,
  FileTextOutlined,
  SmileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Picker from 'emoji-picker-react';
import { MainContext } from 'renderer/contexts/MainContext';
import { onListCategory } from 'renderer/services/CategoryService';
import {
  onGetTemplates,
  onGetUserTemplates,
} from 'renderer/services/TemplateService';
import {
  getDocumentsOfTeam,
  onCreateDocument,
  onDeleteDocument,
} from 'renderer/services/DocumentService';
import { CreateDocument } from 'renderer/models/DocumentModel';
import { useForm } from 'antd/lib/form/Form';
import ImgCrop from 'antd-img-crop';
import TextArea from 'antd/lib/input/TextArea';
import { TeamAddForm } from 'renderer/models/TeamModel';
import { onEditTeam } from 'renderer/services/TeamsService';
import { MessageShow, RequestAlert } from 'renderer/utils/messages/Messages';

const { Meta } = Card;
const { Panel } = Collapse;
const { DirectoryTree } = Tree;
const { confirm } = Modal;

const GroupContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 50px;
  background ${(props) => props.theme.cardBg};
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
      background: ${(props) => props.theme.cardBg};
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
        color: ${(props) => props.theme.cardTexColor} !important;
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
          span.anticon {
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

const ModalLayout = styled(Modal)`
  .ant-modal-content {
    background: ${(props: { theme: { modalBg: any } }) => theme.modalBg};
    .ant-modal-header {
      background: ${(props: { theme: { modalBg: any } }) => theme.modalBg};
      border-color: ${(props: { theme: { modalInnerBorderColor: any } }) =>
        theme.modalInnerBorderColor};
      .ant-modal-title {
        color: ${(props: { theme: { modalInputColor: any } }) =>
          theme.modalInputColor} !important;
      }
    }
    .ant-modal-body {
      label {
        color: ${(props: { theme: { modalInputColor: any } }) =>
          theme.modalInputColor} !important;
      }
      .ant-input {
        background: ${(props: { theme: { modalBgInput: any } }) =>
          theme.modalBgInput} !important;
        border: ${(props: { theme: { modalInputBorder: any } }) =>
          theme.modalInputBorder};
        color: ${(props: { theme: { modalInputColor: any } }) =>
          theme.modalInputColor} !important;
      }
      .useTemplateBx {
        background: #fff;
      }
    }
    .ant-modal-footer {
      border-color: ${(props: { theme: { modalInnerBorderColor: any } }) =>
        theme.modalInnerBorderColor};
      button.ant-btn.ant-btn-primary {
        background-color: var(--purple-1);
        border: none;
      }
    }
  }
`;

const user = JSON.parse(localStorage.getItem('user') || '{}');

export default function Group({ theme, t }) {
  // console.log('detail group');
  // eslint-disable-next-line react/destructuring-assignment
  const { team, defineBackButton, defineDocument, defineTeam } =
    useContext(MainContext);
  const [currentCollapsedId, setCollpasedId] = useState(0);
  const [treeTemplate, setTreeTemplate] = useState([]);
  const [treeUserTemplate, setUserTreeTemplate] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState([]);
  const [isModalEditTeam, setModalEditTeam] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [bannerInput, setBannerInput] = useState([]);
  const [formEditTeam] = useForm();
  const { id: teamId } = useParams();
  const [userTemplReqParams, setUserTemplReqParams] = useState({
    size: 9999,
    page: 1,
    name: '',
  });
  const history = useHistory();

  const [isModalSelectTypeDoc, setIsModalSelectTypeDoc] = useState(false);

  const onSuccessCategoryList = (data) => {
    if (data && data.status === 200) {
    } else {
      RequestAlert(
        props?.t('comum.there_was_a_problem_with_the_request'),
        props?.t('comum.click_okay_to_fix')
      );
    }
  };
  const onErrorategoryList = () => {
    RequestAlert(
      props?.t('comum.there_was_a_problem_with_the_request'),
      props?.t('comum.click_okay_to_fix')
    );
  };

  const { data: lstCategory, refetch: getCategoryList } = onListCategory(
    onSuccessCategoryList,
    onErrorategoryList,
    false
  );

  const onSuccessTemplate = (data: any) => {
    // console.log(data);
    if (data && data.status === 200) {
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
    } else {
      RequestAlert(
        props?.t('comum.there_was_a_problem_with_the_request'),
        props?.t('comum.click_okay_to_fix')
      );
    }
  };

  const { refetch: getTemplateList } = onGetTemplates(
    onSuccessTemplate,
    onErrorategoryList,
    currentCollapsedId
  );

  const onDocumentListSuccess = (data: any) => {
    // eslint-disable-next-line no-empty
    if (data && data.status === 200) {
    } else {
      RequestAlert(
        props?.t('comum.there_was_a_problem_with_the_request'),
        props?.t('comum.click_okay_to_fix')
      );
    }
  };
  const onDocumentListError = () => {
    RequestAlert(
      props?.t('comum.there_was_a_problem_with_the_request'),
      props?.t('comum.click_okay_to_fix')
    );
  };

  const { data: documentList, refetch: refetchDocuments } = getDocumentsOfTeam(
    onDocumentListSuccess,
    onDocumentListError,
    Number(teamId)
  );

  const onCreateDocumentSuccess = () => {
    MessageShow('success', t('comum.successfully_created'));
    refetchDocuments();
    setIsModalSelectTypeDoc(false);
  };
  const onCreateDocumentError = () => {
    MessageShow('error', t('comum.an_error_occurred_in_the_operation'));
  };

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

  const onCancelEditteam = () => {
    setModalEditTeam(false);
  };

  const modalSelecTypeShowModal = () => {
    setIsModalSelectTypeDoc(true);
  };

  const openModalEditTeam = () => {
    setModalEditTeam(true);
  };

  const onChangeCollapse = (key: number) => {
    if (key) {
      setCollpasedId(Number(key));
      getTemplateList();
    }
  };

  const onSelectTree = (keys: React.Key[], info: any) => {
    setSelectedTemplate([info]);
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
        message: t('comum.warning'),
        description: t('comum.you_do_not_have_permission_to_open_this_file'),
      });
    }
  };

  const onSuccesEditTeam = (data: TeamAddForm) => {
    // console.log(data);
    defineTeam(data?.data);
  };

  const onErrorEditTeam = () => {};

  const { mutate: mutateEditTeam } = onEditTeam(
    onSuccesEditTeam,
    onErrorEditTeam
  );

  const onTempListSuccess = (data: any) => {
    setUserTreeTemplate(
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
  const onTempListError = (error: any) => {};

  const { data: userTemplateList, refetch: refetchUserTemplates } =
    onGetUserTemplates(onTempListSuccess, onTempListError, userTemplReqParams);

  const onDeleteSuccess = () => {
    MessageShow('success', t('comum.successfully_deleted'));
    refetchDocuments();
  };
  const onDeleteError = () => {};
  const { mutate: deleteDocument } = onDeleteDocument(
    onDeleteSuccess,
    onDeleteError
  );

  const handleDocRightClick = (document) => {};

  const openLocalFile = () => {
    // window.electron.ipcRenderer.openDialog();
  };


  const onEmojiClick = (
    _event: any,
    emojiObject: React.SetStateAction<any>
  ) => {
    formEditTeam.setFieldsValue(
      formEditTeam.getFieldValue('title') + emojiObject.emoji
    );
    setChosenEmoji(emojiObject);
  };

  const handleMenuEmojiClick = (e: any) => {
    // console.log('click', e);
    console.log(chosenEmoji);
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

  const onEditGroup = (values: any) => {
    const teamForm: TeamAddForm = {
      id: team.id,
      name: chosenEmoji ? `${chosenEmoji.emoji} ${values.title}` : values.title,
      description: values.description,
      banner: bannerInput[0].thumbUrl,
      type: values.type,
    };
    mutateEditTeam(teamForm);
    // console.log(teamForm);
  };

  const onChangeBanner = ({ fileList: newFileList }) => {
    console.log(newFileList);
    setBannerInput(newFileList);
  };

  const menuEmoji = (
    // <Button type="primary" shape="circle" icon={<SearchOutlined />} />
    <Menu onClick={handleMenuEmojiClick}>
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

  const documentMenuClick = (e: any, id: number) => {
    if (e.key === 'delete') {
      confirm({
        title: t('comum.are_you_sure_delete_this_register'),
        icon: <ExclamationCircleOutlined />,
        content: t('comum.if_deleted_the_register_wont_be_recoverd'),
        okText: t('comum.yes'),
        okType: 'danger',
        cancelText: t('comum.no'),
        onOk() {
          deleteDocument({ docId: id, teamId: team.id });
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  };

  const documentMenu = (id) => (
    <Menu onClick={(e) => documentMenuClick(e, id)}>
      {/* <Menu.Item key="1">Rename</Menu.Item> */}
      <Menu.Item key="delete" danger icon={<DeleteFilled />}>
        {t('comum.delete')}
      </Menu.Item>
    </Menu>
  );
  const [documentName, setDcumentName] = useState('Untitled');
  const [documenType, setDcumentType] = useState('PRIVATE');

  const onEditFileName = (e) => {
    // console.log(e);
    setDcumentName(e.target.value);
  };

  const onChangeDocumentType = (e) => {
    // console.log('radio checked', e.target.value);
    setDcumentType(e.target.value);
  };

  return (
    <GroupContainer theme={theme}>
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
                <h3>{t('comum.team_details')}</h3>
              </Col>
              <Col>
                <Button
                  type="link"
                  size="small"
                  className="btn-action-pmd"
                  onClick={() => openModalEditTeam()}
                >
                  <BsPencil />
                </Button>
              </Col>
            </Row>
          </div>
          <Row style={{ height: 'auto' }}>
            <Col span={24}>
              <p>{team.description}</p>
            </Col>
          </Row>
          <Row style={{ height: 'auto' }}>
            <Col span={24}>
              <h3>{t('comum.members')}</h3>
            </Col>
            <Col span={24}>
              <Avatar.Group maxCount={6}>
                {team?.contributors?.length > 0 &&
                  team.contributors.map((contributor) => (
                    <Tooltip
                      key={contributor.id}
                      title={`${contributor.firstName} ${contributor.lastName}`}
                      placement="top"
                    >
                      <Avatar
                        style={{ backgroundColor: '#87d068' }}
                        icon={<UserOutlined />}
                        src={contributor.avatar}
                      />
                    </Tooltip>
                  ))}
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
                  getCategoryList();
                  modalSelecTypeShowModal();
                }}
              >
                <p>
                  {t('comum.new_document')}&nbsp;
                  <HiOutlineDocumentAdd />
                </p>
              </Button>
            </Col>
          </Row>
          <Row style={{ height: 'auto', maxHeight: '90%', overflowY: 'auto' }}>
            {documentList?.status === 200 &&
              documentList?.data.numberOfElements === 0 && (
                <Col span={24}>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </Col>
              )}

            {documentList?.status === 200 &&
              documentList?.data.numberOfElements > 0 &&
              documentList?.data.content.map((document) => {
                return (
                  <Dropdown
                    overlay={documentMenu(document.id)}
                    disabled={document.creator !== user?.username}
                    trigger={['contextMenu']}
                  >
                    <Col
                      span={4}
                      key={document.id}
                      className={
                        document.creator === user?.username ||
                        isContributor(document.contributors)
                          ? 'doc-ls'
                          : 'doc-ls disable'
                      }
                    >
                      <div onClick={() => openDocument(document)}>
                        <Button type="link" block style={{ fontSize: '2rem' }}>
                          {document.type === 'PUBLIC' ? (
                            <FileTextOutlined />
                          ) : (
                            <FileProtectOutlined />
                          )}
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
        visible={isModalSelectTypeDoc}
        onOk={modalSelecTypeHandleOk}
        onCancel={modalSelecTypeHandleCancel}
        footer={[
          <Button
            type="default"
            onClick={() => {
              setIsModalSelectTypeDoc(false);
            }}
          >
            {t('comum.cancel')}
          </Button>,
          <Button
            type="primary"
            disabled={selectedTemplate.length === 0}
            onClick={() => {
              console.log(selectedTemplate);
              // console.log(teamId);

              const form: CreateDocument = {
                name: documentName,
                content: '{[]}',
                type: documenType,
                teamId: Number(teamId),
                templateId: selectedTemplate?.node
                  ? selectedTemplate.node.key
                  : null,
              };
              createDocument(form);
            }}
          >
            {t('comum.create')}
          </Button>,
        ]}
        width={800}
        bodyStyle={{
          maxHeight: '400px',
          height: '400px',
          padding: '0',
        }}
      >
        <Row className="templateP">
          <Col flex="600" className="previewTemplate">
            <div className="fl-name">
              <Input
                placeholder="input with clear icon"
                allowClear
                onChange={onEditFileName}
                value={documentName}
              />
              <Radio.Group
                defaultValue="PRIVATE"
                onChange={onChangeDocumentType}
                value={documenType}
              >
                <Radio value="PUBLIC">{t('comum.public')}</Radio>
                <Radio value="PRIVATE">{t('comum.private')}</Radio>
              </Radio.Group>
            </div>
            <div>
              {selectedTemplate.length > 0 && selectedTemplate[0]?.node ? (
                selectedTemplate[0]?.node?.content
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </div>
          </Col>
          <Col
            flex="200px"
            className="collapseSelect"
            style={{ overflow: 'hidden' }}
          >
            <Collapse
              accordion
              bordered={false}
              defaultActiveKey={['1']}
              style={{ height: '100%', overflow: 'auto' }}
              onChange={(e) => onChangeCollapse(e)}
            >
              <Panel header={t('comum.my_templates')} key="0">
                {/* {text} */}
                {/* userTemplateList */}
                <DirectoryTree
                  multiple
                  defaultExpandAll
                  onSelect={onSelectTree}
                  onExpand={onExpand}
                  treeData={treeUserTemplate}
                />
              </Panel>
              {lstCategory?.status === 200 &&
                lstCategory?.data.content.map((item) => (
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

      <ModalLayout
        theme={theme}
        visible={isModalEditTeam}
        title={t('home.modal_create_team.create_new_team_work')}
        okText={t('comum.create')}
        cancelText={t('comum.cancel')}
        onCancel={onCancelEditteam}
        onOk={() => {
          formEditTeam
            .validateFields()
            // eslint-disable-next-line promise/always-return
            .then((values) => {
              onEditGroup(values);
              formEditTeam.resetFields();
            })
            .catch((info) => {
              // console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={formEditTeam}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: 'public',
          }}
        >
          <Row>
            <Col flex="100px">
              <Form.Item label=".">
                <Dropdown overlay={menuEmoji} trigger={['click']}>
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
                initialValue={team.name}
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
            initialValue={team.type}
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
            initialValue={team.description}
            rules={[
              {
                required: true,
                message: t('home.modal_create_team.required_field'),
              },
            ]}
          >
            <TextArea
              placeholder={t('home.modal_create_team.write_teams_drescription')}
              allowClear
              showCount
              maxLength={400}
            />
          </Form.Item>
        </Form>
      </ModalLayout>
    </GroupContainer>
  );
}
