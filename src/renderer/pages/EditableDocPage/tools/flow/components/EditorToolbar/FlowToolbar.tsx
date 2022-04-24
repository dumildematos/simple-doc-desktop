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
      <ToolbarButton command="copy" />
      <ToolbarButton command="paste" />
      <ToolbarButton command="delete" />
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
      <ToolbarButton command="toBack" icon="to-back" text="To Back" />
      <ToolbarButton command="toFront" icon="to-front" text="To Front" />
      <Divider type="vertical" />
      <ToolbarButton
        command="multiSelect"
        icon="multi-select"
        text="Multi Select"
      />
      <ToolbarButton command="addGroup" icon="group" text="Add Group" />
      <ToolbarButton command="unGroup" icon="ungroup" text="Ungroup" />
    </Toolbar>
  </ContainerBox>
);

export default FlowToolbar;
