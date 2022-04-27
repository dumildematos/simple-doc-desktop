import { Col, Row } from 'antd';
import GGEditor, { Mind } from 'gg-editor';

import { Content } from 'antd/lib/layout/layout';
import styled from 'styled-components';
import EditorMinimap from './components/EditorMinimap';
import { MindContextMenu } from './components/EditorContextMenu';
import { MindDetailPanel } from './components/EditorDetailPanel';
import { MindToolbar } from './components/EditorToolbar';
import data from './worldCup2018.json';

GGEditor.setTrackable(false);

const ContainerBox = styled.div`
  height: 100%;
  .ant-layout-content {
    height: 100%;

    .editor {
      display: flex;
      flex: 1;
      flex-direction: column;
      width: 100%;
      height: calc(100vh - 250px);
    }
    .editorHd {
      padding: 8px;
      // border: 1px solid red;
    }
    .editorBd {
      flex: 1;
    }

    .editorSidebar,
    .editorContent {
      display: flex;
      flex-direction: column;
    }

    .editorContent {
      :global {
        .graph-container canvas {
          vertical-align: middle;
        }
      }
    }

    .editorSidebar {
      :global {
        .g6-editor-minimap-container {
          background: none !important ;
        }
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }

      &:last-child {
        border-left: 1px solid #f5f5f5;
      }
    }
    #J_MindContainer_4 {
      height: 100% !important;
      .graph-container {
        height: 100% !important;
      }
    }
    .flow,
    .mind,
    .koni {
      flex: 1;
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const MindEditor = () => (
  <ContainerBox>
    <Content>
      <GGEditor className="editor">
        <Row className="editorHd">
          <Col span={24}>
            <MindToolbar />
          </Col>
        </Row>
        <Row className="editorBd">
          <Col span={20} className="editorContent">
            <Mind data={data} className="mind" />
          </Col>
          <Col span={4} className="editorSidebar">
            <MindDetailPanel />
            <EditorMinimap />
          </Col>
        </Row>
        <MindContextMenu />
      </GGEditor>
    </Content>
  </ContainerBox>
);
