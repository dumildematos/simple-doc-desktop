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
    }

    &:last-child {
    }
  }

  .flow,
  .mind,
  .koni {
    flex: 1;
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
          <Col span={16} className="editorContent">
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
