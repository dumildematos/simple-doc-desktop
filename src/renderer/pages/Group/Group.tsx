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
} from 'antd';
import { Link, useHistory, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { BsPencil } from '@react-icons/all-files/bs/BsPencil';
import { HiOutlineDocumentAdd } from '@react-icons/all-files/hi/HiOutlineDocumentAdd';
import { AntDesignOutlined, FileFilled, UserOutlined } from '@ant-design/icons';
import { MainContext } from 'renderer/contexts/MainContext';

const { Meta } = Card;
const { Panel } = Collapse;
const { DirectoryTree } = Tree;

const treeData = [
  {
    title: 'parent 0',
    key: '0-0',
    icon: '🍿',
  },
  {
    title: 'parent 1',
    key: '0-1',
    icon: '🥊',
  },
];

const GroupContainer = styled.div`
  /* background: red !important; */
  width: 100%;
  height: 100%;
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
  // eslint-disable-next-line react/destructuring-assignment
  const { definedEditorIsOpened, groupPage } = useContext(MainContext);

  const history = useHistory();

  const [isModalSelectTypeDoc, setIsModalSelectTypeDoc] = useState(false);

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
    // console.log(2);
    definedEditorIsOpened(true);
    const urlDocPage = `/page-doc/${id}`;
    history.push(urlDocPage);
  };
  // console.log(props.theme)

  const onChangeCollapse = (key: any) => {
    console.log(key);
  };


  const onSelect = (keys: React.Key[], info: any) => {
    console.log('Trigger Select', keys, info);
  };

  const onExpand = () => {
    console.log('Trigger Expand');
  };

  return (
    <GroupContainer theme={props.theme}>
      <Row justify="space-between" className="main">
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
                onClick={modalSelecTypeShowModal}
              >
                <HiOutlineDocumentAdd />
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={8} className="doc-ls">
              <Link to={`/page-doc/${2}`} onClick={() => openDocument(2)}>
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
            preview
          </Col>
          <Col flex="200px" className="collapseSelect">
            <div className="useTemplateBx">
              <Button type="primary" block>
                Use Template
              </Button>
            </div>
            <Collapse bordered={false} defaultActiveKey={['1']}>
              <Panel header="Default" key="2">
                {text}
              </Panel>
              <Panel header="Design" key="1">
                <DirectoryTree
                  multiple
                  defaultExpandAll
                  onSelect={onSelect}
                  onExpand={onExpand}
                  treeData={treeData}
                />
              </Panel>
              <Panel header="Student" key="2">
                {text}
              </Panel>
              <Panel header="Engineering" key="3">
                {text}
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </Modal>
    </GroupContainer>
  );
}


