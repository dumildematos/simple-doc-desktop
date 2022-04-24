import { Divider } from 'antd';
import { Toolbar } from 'gg-editor';
import ToolbarButton from './ToolbarButton';

import styled from 'styled-components';
const ContainerBox = styled.div`
  .toolbar {
    display: flex;
    align-items: center;
    .command .anticon {
      display: inline-block;
      width: 27px;
      height: 27px;
      margin: 0 6px;
      padding-top: 6px;
      text-align: center;
      cursor: pointer;

      &:hover {
        border: 1px solid #f5f5f;
      }
    }
    .disable .anticon {
      color: fade(#000, 85%);
      cursor: auto;

      &:hover {
        border: 1px solid hsv(0, 0, 85%);
      }
    }
  }
  .tooltip {
    .ant-tooltip-inner {
      font-size: 12px;
      border-radius: 0;
    }
  }
`;

const FlowToolbar = () => (
  <ContainerBox>
    <Toolbar className="toolbar">
      <ToolbarButton command="undo" />
      <ToolbarButton command="redo" />
      <Divider type="vertical" />
      <ToolbarButton command="zoomIn" icon="zoom-in" text="Zoom In" />
      <ToolbarButton command="zoomOut" icon="zoom-out" text="Zoom Out" />
      <ToolbarButton command="autoZoom" icon="fit-map" text="Fit Map" />
      <ToolbarButton
        command="resetZoom"
        icon="actual-size"
        text="Actual Size"
      />
      <Divider type="vertical" />
      <ToolbarButton command="append" text="Topic" />
      <ToolbarButton
        command="appendChild"
        icon="append-child"
        text="Subtopic"
      />
      <Divider type="vertical" />
      <ToolbarButton command="collapse" text="Fold" />
      <ToolbarButton command="expand" text="Unfold" />
    </Toolbar>
  </ContainerBox>
);

export default FlowToolbar;
