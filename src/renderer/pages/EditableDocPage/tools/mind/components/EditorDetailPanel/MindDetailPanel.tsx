import { CanvasPanel, DetailPanel, NodePanel } from 'gg-editor';

import { Card } from 'antd';
import DetailForm from './DetailForm';
import styled from 'styled-components';
const ContainerBox = styled.div`
  .detailPanel {
    flex: 1;
    background-color: orangered;
  }
`;

const MindDetailPanel = () => (
  <ContainerBox>
    <DetailPanel className="detailPanel">
      <NodePanel>
        <DetailForm type="node" />
      </NodePanel>
      <CanvasPanel>
        <Card type="inner" size="small" title="Canvas" bordered={false} />
      </CanvasPanel>
    </DetailPanel>
  </ContainerBox>
);

export default MindDetailPanel;
