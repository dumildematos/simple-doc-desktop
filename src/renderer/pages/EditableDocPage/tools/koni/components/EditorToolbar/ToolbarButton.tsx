import { Command } from 'gg-editor';
import React from 'react';
import { Tooltip } from 'antd';
import styled from 'styled-components';
import IconFont from '../../common/IconFont';

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
const upperFirst = (str: string) =>
  str.toLowerCase().replace(/( |^)[a-z]/g, (l: string) => l.toUpperCase());

type ToolbarButtonProps = {
  command: string;
  // eslint-disable-next-line react/require-default-props
  icon?: string;
  // eslint-disable-next-line react/require-default-props
  text?: string;
};
const ToolbarButton: React.FC<ToolbarButtonProps> = (props) => {
  const { command, icon, text } = props;

  return (
    <ContainerBox>
      <Command name={command}>
        <Tooltip
          title={text || upperFirst(command)}
          placement="bottom"
          overlayClassName="tooltip"
        >
          <IconFont type={`icon-${icon || command}`} />
        </Tooltip>
      </Command>
    </ContainerBox>
  );
};

export default ToolbarButton;
