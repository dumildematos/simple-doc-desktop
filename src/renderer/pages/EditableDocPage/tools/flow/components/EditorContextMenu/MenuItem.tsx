import { Command } from 'gg-editor';
import React from 'react';
import styled from 'styled-components';
import IconFont from '../../common/IconFont';

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
const upperFirst = (str: string) =>
  str.toLowerCase().replace(/( |^)[a-z]/g, (l: string) => l.toUpperCase());

type MenuItemProps = {
  command: string;
  // eslint-disable-next-line react/require-default-props
  icon?: string;
  // eslint-disable-next-line react/require-default-props
  text?: string;
};
const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { command, icon, text } = props;

  return (
    <ContainerBox>
      <Command name={command}>
        <div className="item">
          <IconFont type={`icon-${icon || command}`} />
          <span>{text || upperFirst(command)}</span>
        </div>
      </Command>
    </ContainerBox>
  );
};

export default MenuItem;
