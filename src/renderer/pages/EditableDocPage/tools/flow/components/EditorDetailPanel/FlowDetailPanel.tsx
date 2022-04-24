import {
  CanvasPanel,
  DetailPanel,
  EdgePanel,
  GroupPanel,
  MultiPanel,
  NodePanel,
} from 'gg-editor';

import { Card } from 'antd';
import DetailForm from './DetailForm';

import styled from 'styled-components';
const ContainerBox = styled.div`
  .detailPanel {
    flex: 1;
    background-color: orangered;
  }
`;

const FlowDetailPanel = () => (
  <ContainerBox>
    <DetailPanel className="detailPanel">
      <NodePanel>
        <DetailForm type="node" />
      </NodePanel>
      <EdgePanel>
        <DetailForm type="edge" />
      </EdgePanel>
      <GroupPanel>
        <DetailForm type="group" />
      </GroupPanel>
      <MultiPanel>
        <Card type="inner" size="small" title="Multi Select" bordered={false} />
      </MultiPanel>
      <CanvasPanel>
        <Card type="inner" size="small" title="Canvas" bordered={false} />
      </CanvasPanel>
    </DetailPanel>
  </ContainerBox>
);

export default FlowDetailPanel;
