import {
  CanvasMenu,
  ContextMenu,
  EdgeMenu,
  GroupMenu,
  MultiMenu,
  NodeMenu,
} from 'gg-editor';

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
        background: #f1f1f1;
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
const FlowContextMenu = () => (
  <ContainerBox>
    <ContextMenu className="contextMenu">
      <NodeMenu>
        <MenuItem command="copy" />
        <MenuItem command="delete" />
      </NodeMenu>
      <EdgeMenu>
        <MenuItem command="delete" />
      </EdgeMenu>
      <GroupMenu>
        <MenuItem command="copy" />
        <MenuItem command="delete" />
        <MenuItem command="unGroup" icon="ungroup" text="Ungroup" />
      </GroupMenu>
      <MultiMenu>
        <MenuItem command="copy" />
        <MenuItem command="paste" />
        <MenuItem command="addGroup" icon="group" text="Add Group" />
        <MenuItem command="delete" />
      </MultiMenu>
      <CanvasMenu>
        <MenuItem command="undo" />
        <MenuItem command="redo" />
        <MenuItem command="pasteHere" icon="paste" text="Paste Here" />
      </CanvasMenu>
    </ContextMenu>
  </ContainerBox>
);

export default FlowContextMenu;
