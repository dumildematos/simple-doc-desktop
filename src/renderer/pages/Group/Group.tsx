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
} from 'antd';
import { Link, useHistory, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { BsPencil } from '@react-icons/all-files/bs/BsPencil';
import { HiOutlineDocumentAdd } from '@react-icons/all-files/hi/HiOutlineDocumentAdd';
import {
  AntDesignOutlined,
  CarryOutOutlined,
  FileFilled,
  FileTextOutlined,
  FormOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { MainContext } from 'renderer/contexts/MainContext';
import { onListCategory } from 'renderer/services/CategoryService';
import { onGetTemplates } from 'renderer/services/TemplateService';

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

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export default function Group(props: any) {
  // console.log('detail group');
  // eslint-disable-next-line react/destructuring-assignment
  const { definedEditorIsOpened, groupPage, defineBackButton } =
    useContext(MainContext);
  const [currentCollapsedId, setCollpasedId] = useState(0);
  const [treeTemplate, setTreeTemplate] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState({});
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

  const { data: templateList, refetch: getTemplateList } = onGetTemplates(
    onSuccessTemplate,
    onErrorategoryList,
    currentCollapsedId
  );

  // console.log(lstCategory);

  const modalSelecTypeHandleOk = () => {
    setIsModalSelectTypeDoc(false);
  };

  const modalSelecTypeHandleCancel = () => {
    setIsModalSelectTypeDoc(false);
  };

  const modalSelecTypeShowModal = () => {
    setIsModalSelectTypeDoc(true);
  };

  const openDocument = (id: number) => {
    definedEditorIsOpened(true);
    history.push(`/page-doc/${id}`);
  };

  const onChangeCollapse = (key: number) => {
    if (key) {
      setCollpasedId(Number(key));
      console.log(currentCollapsedId);
      getTemplateList();
      // console.log(templateList);
      // setTreeTemplate(

      // );
    }
  };

  const onSelectTree = (keys: React.Key[], info: any) => {
    console.log('Trigger Select', keys, info);
    setSelectedTemplate(info);
  };

  const onExpand = () => {
    console.log('Trigger Expand');
  };

  return (
    <GroupContainer theme={props.theme}>
      <Row
        justify="space-between"
        className="main"
        style={{ marginTop: '1rem' }}
      >
        <Col span={8} className="main">
          <Row justify="space-between" style={{ height: 'auto' }}>
            <Col>
              <h3>Detalhes da equipe</h3>
            </Col>
            <Col>
              <Button type="link" size="small" className="btn-action-pmd">
                <BsPencil />
              </Button>
            </Col>
          </Row>
          <Row style={{ height: 'auto' }}>
            <Col span={24}>
              <h4>Nome da eqiupe</h4>
            </Col>
            <Col span={24}>
              <p>{groupPage.desc}</p>
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
        <Col span={15} style={{ overflow: 'scroll' }} className="main">
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
                  New Document &nbsp;
                  <HiOutlineDocumentAdd />
                </p>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={8} className="doc-ls">
              <Link to={`/page-doc/${2}`}>
                <Card style={{ width: '100%' }}>
                  <Meta
                    avatar={<Avatar icon={<FileFilled />} />}
                    title="Card title Dumilde"
                  />
                </Card>
              </Link>
            </Col>
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
            {selectedTemplate ? selectedTemplate.node.content : 'empty'}
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
                {text}
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
