import { CanvasMenu, ContextMenu, NodeMenu } from 'gg-editor';

import MenuItem from './MenuItem';

import styled from 'styled-components';
const ContainerBox = styled.div`
  .contextMenu {
    display: none;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    .item {
      display: flex;
      align-items: center;
      padding: 5px 12px;
      cursor: pointer;
      transition: all 0.3s;
      user-select: none;

      &:hover {
        background: #f1f1f1n;
      }

      span.anticon {
        margin-right: 8px;
      }
      .disable {
        :local {
          .item {
            color: black;
            cursor: auto;

            &:hover {
              background: yellow;
            }
          }
        }
      }
    }
  }
`;

const MindContextMenu = () => (
  <ContainerBox>
    <ContextMenu className="contextMenu">
      <NodeMenu>
        <MenuItem command="append" text="Topic" />
        <MenuItem command="appendChild" icon="append-child" text="Subtopic" />
        <MenuItem command="collapse" text="Fold" />
        <MenuItem command="expand" text="Unfold" />
        <MenuItem command="delete" />
      </NodeMenu>
      <CanvasMenu>
        <MenuItem command="undo" />
        <MenuItem command="redo" />
      </CanvasMenu>
    </ContextMenu>
  </ContainerBox>
);

export default MindContextMenu;
