import { AppstoreFilled, SaveFilled } from '@ant-design/icons';
import { Affix, Avatar, Button, Drawer, List, Skeleton, Space } from 'antd';
import { useContext, useState } from 'react';
import { MainContext } from 'renderer/contexts/MainContext';
import { onEditTemplate } from 'renderer/services/TemplateService';
import { MessageShow } from 'renderer/utils/messages/Messages';
import styled from 'styled-components';
import { saveAs } from 'file-saver';
import { FlowEditor } from './tools/flow';
import { KoniEditor } from './tools/koni';
import { MindEditor } from './tools/mind';
import { TemplateEditor } from './tools/TemplateEditor/TemplateEditor';

const EditorContainer = styled.div`
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

// eslint-disable-next-line import/prefer-default-export
export const EditableTemplatePage = (props: any) => {
  const { currentTemplate, defineCurrentTemplate} =
  useContext(MainContext);
  const [quill, setQuill] = useState();
  const [visibleTools, setVisibleTools] = useState(false);
  const [draggableToolModal, setDraggableToolModal] = useState({
    visible: false,
    disabled: true,
    type: '',
  });

  const onSaveSuccess = (data: any) => {
    MessageShow('success', 'Action in progress');
  };
  const onSaveError = (data: any) => {

  };
  const { mutate: updateTemplate } = onEditTemplate(
    onSaveSuccess,
    onSaveError
  );

  const showDrawerTools = () => {
    setVisibleTools(true);
  };
  const onCloseTools = () => {
    setVisibleTools(false);
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
    <EditorContainer theme={props.theme}>
      <TemplateEditor quill={quill} setQuill={setQuill}/>
      <Affix style={{ position: 'fixed', top: '80%', right: '3%' }}>
            <Button
              style={{ color: 'var(--purple-1)', fontSize: '1.7rem' }}
              size="middle"
              shape="circle"
              type="link"
              onClick={showDrawerTools}
            >
              <AppstoreFilled />
            </Button>
          </Affix>
      <Affix style={{ position: 'fixed', top: '90%', right: '3%' }}>
        <Button
          style={{ color: 'var(--purple-1)', fontSize: '1.7rem' }}
          size="middle"
          shape="circle"
          type="link"
          onClick={()=> {
            const templateData = {
              id: currentTemplate.id,
              category: currentTemplate.category,
              createdAt: currentTemplate.createdAt,
              name: currentTemplate.name,
              price: currentTemplate.price,
              content: JSON.stringify(quill.getContents()),
            }
            updateTemplate(templateData)
          }}
        >
          <SaveFilled />
        </Button>
      </Affix>

               <Drawer
            title="Tools"
            placement="right"
            onClose={onCloseTools}
            visible={visibleTools}
            className="tools-drawer"
          >
{/*
            <Row>
              <Col>
                <Button block style={{ marginTop: '5px' }} onClick={showToolsModal}>Flow Editor</Button>
                <Button block style={{ marginTop: '5px' }}>Mind Editor</Button>
                <Button block style={{ marginTop: '5px' }}>Koni Editor</Button>
              </Col>
            </Row> */}
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
            title={` Drawer`}
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
    </EditorContainer>
  );
};
