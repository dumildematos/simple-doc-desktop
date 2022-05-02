import {
  AuditOutlined,
  DeleteFilled,
  ExclamationCircleOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { HiOutlineDocumentAdd } from '@react-icons/all-files/hi/HiOutlineDocumentAdd';
import { Empty, Button, Col, Row, Menu, Modal, Dropdown, Input } from 'antd';
import Search from 'antd/lib/transfer/search';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { MainContext } from 'renderer/contexts/MainContext';
import {
  onCreateTemplate,
  onDeleteTemplate,
  onGetUserTemplates,
} from 'renderer/services/TemplateService';
import { MessageShow } from 'renderer/utils/messages/Messages';
import styled from 'styled-components';
const { confirm } = Modal;
const TemplateBuilderContainer = styled.div`
  /* background: red !important; */
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 50px;
  main.ant-layout-content.site-layout-background {
    padding: 0 !important;
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
    }
  }
`;

export default function TemplateBuilder(props: any) {
  const { team, defineBackButton, defineCurrentTemplate, defineTeam } =
    useContext(MainContext);
  const history = useHistory();
  const [listReqParams, setLisReqParams] = useState({
    size: 9999,
    page: 1,
    name: '',
  });
  const [isVisibleModalCreate, setIsVisibleModalCreate] = useState(false);
  const [formTemplateName, setformTemplateName] = useState('');

  const onReqSuccess = (data: any) => {
    console.log(data.data);
    // eslint-disable-next-line no-empty
    if (data.status > 200 || !data) {
      console.log(data);
    }
  };

  const onReqError = (error: any) => {
    console.log(error);
  };

  const { data: templateList, refetch } = onGetUserTemplates(
    onReqSuccess,
    onReqError,
    listReqParams
  );

  const onCreateSuccess = (data: any) => {
    console.log(data);
    MessageShow('success', 'Action in progress');
    refetch();
  };

  const onCreateError = (error: any) => {
    console.log(error);
  };

  const { mutate: createTemplate } = onCreateTemplate(
    onCreateSuccess,
    onCreateError
  );

  const { mutate: deleteTemplate } = onDeleteTemplate(
    onCreateSuccess,
    onCreateError
  );

  const onSearch = (value) => {
    setLisReqParams({ name: value });
    refetch();
  };

  const templateClickMenu = (e: any, id: number) => {
    if (e.key === 'delete') {
      confirm({
        title: 'Are you sure delete this task?',
        icon: <ExclamationCircleOutlined />,
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          deleteTemplate(id);
          // deleteDocument({ docId: id, teamId: team.id });
          // if (team.docs === 0) {
          //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
          //   // deleteTeam(team.id);
          // } else {
          //   MessageShow('error', 'Action in progress');
          // }
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  };

  const templateMenu = (id) => (
    <Menu onClick={(e) => templateClickMenu(e, id)}>
      {/* <Menu.Item key="1">Rename</Menu.Item> */}
      <Menu.Item key="delete" danger icon={<DeleteFilled />}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const openTemplate = (template: any) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    // defineBackButton({
    //   state: true,
    //   title: template.name,
    //   subtitle: '',
    //   prevPath: window.location.pathname,
    // });
    defineCurrentTemplate(template);
    history.push(`/page-template/${template.id}`);
    setTimeout(() => {}, 0);
  };

  const onOkayModalCreate = () => {
    setIsVisibleModalCreate(false);
    if (formTemplateName) {
      const reqParam = {
        name: formTemplateName,
        content: JSON.stringify({ ops: [{ insert: 'New template' }] }),
        price: '0.00',
        description: '',
        cover: "",
        categoryId: null,
      };
      createTemplate(reqParam);
      setformTemplateName('');
    } else {
      MessageShow('error', 'Action in progress');
    }
  };
  const onCancelModalCreate = () => {
    setIsVisibleModalCreate(false);
  };

  const onCreatingName = (e: any) => {
    // console.log(e.target.value);
    setformTemplateName(e.target.value);
  };

  return (
    <>
      <TemplateBuilderContainer>
        <Row justify="start">
          <Col span={24}>
            <h1 style={{ fontSize: '2rem' }}>Template Builder</h1>
            <p>Encontre equipes de trabalho públicos</p>
          </Col>
        </Row>
        <Row>
          <Col span={8} style={{ float: 'right' }}>
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              onChange={(e) => {
                setLisReqParams({
                  page: listReqParams.page,
                  size: listReqParams.size,
                  name: e.target.value,
                });
                refetch();
              }}
              allowClear
              style={{ width: '300', float: 'right' }}
            />
          </Col>
          <Col span={8} offset={8}>
            <Button
              type="primary"
              style={{ float: 'right' }}
              // className="btn-action-pmd"
              onClick={() => {
                setIsVisibleModalCreate(true);
                // getCategoryList();
                // modalSelecTypeShowModal();
              }}
            >
              <p>
                New Template &nbsp;
                <AuditOutlined />
              </p>
            </Button>
          </Col>
        </Row>
        {templateList?.status === 200 &&
          templateList?.data.totalElements === 0 && (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
                marginTop: '5%',
                marginRight: 'auto',
              }}
              description={
                <span>
                  Customize <a href="#API">Description</a>
                </span>
              }
            >
              <Button type="primary">Create Now</Button>
            </Empty>
          )}
        <Row>
          {templateList?.status === 200 &&
            templateList?.data.totalElements > 0 &&
            templateList.data.content.map((template: any) => {
              return (
                <Dropdown
                  overlay={templateMenu(template.id)}
                  trigger={['contextMenu']}
                >
                  <Col span={4} key={template.id} className="doc-ls">
                    <div onClick={() => openTemplate(template)}>
                      <Button type="link" block style={{ fontSize: '2rem' }}>
                        <AuditOutlined />
                      </Button>
                    </div>
                    {template.name}
                  </Col>
                </Dropdown>
              );
            })}
        </Row>
        <Modal
          title="Basic Modal"
          visible={isVisibleModalCreate}
          onOk={onOkayModalCreate}
          onCancel={onCancelModalCreate}
        >
          <Input
            placeholder="Basic usage"
            value={formTemplateName}
            onChange={onCreatingName}
          />
        </Modal>
      </TemplateBuilderContainer>
    </>
  );
}
