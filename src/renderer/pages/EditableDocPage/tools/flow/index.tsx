import { Col, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import GGEditor, { Flow } from 'gg-editor';
import { FlowContextMenu } from './components/EditorContextMenu';
import { FlowDetailPanel } from './components/EditorDetailPanel';
import { FlowItemPanel } from './components/EditorItemPanel';
import EditorMinimap from './components/EditorMinimap';
import { FlowToolbar } from './components/EditorToolbar';
import styled from 'styled-components';

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
      height: 100% !important;
      // background: green;
      .ant-row.flow-container {
        height: 100%;
        .ant-col {
          height: 100%;
        }
      }
      #J_FlowContainer_1 {
        height: 100% !important;
        .graph-container {
          height: 100% !important;
        }
      }
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const FlowEditor = () => (
  // eslint-disable-next-line react/jsx-no-undef
  <ContainerBox>
    <Content>
      <GGEditor className="editor">
        <Row>
          <Col span={24}>
            <FlowToolbar />
          </Col>
        </Row>
        <Row className="flow-container">
          <Col span={4}>
            <FlowItemPanel />
          </Col>
          <Col span={16}>
            <Flow />
          </Col>
          <Col span={4}>
            <FlowDetailPanel />
            <EditorMinimap />
          </Col>
        </Row>
        <FlowContextMenu />
      </GGEditor>
    </Content>
  </ContainerBox>
);
