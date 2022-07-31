import { Col, Row } from 'antd';
import GGEditor, { Koni } from 'gg-editor';

import { Content } from 'antd/lib/layout/layout';
import EditorMinimap from './components/EditorMinimap';
import { KoniContextMenu } from './components/EditorContextMenu';
import { KoniDetailPanel } from './components/EditorDetailPanel';
import { KoniItemPanel } from './components/EditorItemPanel';
import { KoniToolbar } from './components/EditorToolbar';
import styled from 'styled-components';

GGEditor.setTrackable(false);

const ContainerBox = styled.div`
  height: 100%;

  .editor {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .editorHd {
    padding: 8px;
    background: @descriptions-bg;
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
    height: 100%;
    :global {
      .koni,
      .graph-container {
        height: 100%;
      }
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
    }

    &:last-child {
    }
  }

  .flow,
  .mind,
  .koni {
    flex: 1;
  }
  .koni {
    height: 400px;
  }

`;

// eslint-disable-next-line import/prefer-default-export
export const KoniEditor = () => (
  <ContainerBox>
    <Content>
      <GGEditor className="editor">
        <Row className="editorHd">
          <Col span={24}>
            <KoniToolbar />
          </Col>
        </Row>
        <Row className="editorBd">
          <Col span={2} className="editorSidebar">
            <KoniItemPanel />
          </Col>
          <Col span={16} className="editorContent" style={{ height: '400px' }}>
            <Koni className="koni" />
          </Col>
          <Col span={6} className="editorSidebar">
            <KoniDetailPanel />
            <EditorMinimap />
          </Col>
        </Row>
        <KoniContextMenu />
      </GGEditor>
    </Content>
  </ContainerBox>
);
