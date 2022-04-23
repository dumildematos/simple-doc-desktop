
import { Avatar, Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components';

const ComponentContainer  = styled.div`

.avatarList {
  display: inline-block;
  ul {
    display: inline-block;
    margin-left: 8px;
    font-size: 0;
  }
}

.avatarItem {
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-left: -8px;
  font-size: 12px;

    .ant-avatar {
      border: 1px solid hsv(0, 0, 85%);
    }

}

.avatarItemLarge {
  width: 40px;
  height: 40px;
}

.avatarItemSmall {
  width: 24px;
  height: 24px;
}

.avatarItemMini {
  width: 20px;
  height: 20px;
    .ant-avatar {
      width: 20px;
      height: 20px;
      line-height: 20px;

      .ant-avatar-string {
        font-size: 12px;
        line-height: 18px;
      }
    }

}


`;
export declare type SizeType = number | 'small' | 'default' | 'large';
export type AvatarItemProps = {
  tips: React.ReactNode;
  src: string;
  size?: SizeType;
  style?: React.CSSProperties;
  onClick?: () => void;
};
export type AvatarListProps = {
  Item?: React.ReactElement<AvatarItemProps>;
  size?: SizeType;
  maxLength?: number;
  excessItemsStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  children: React.ReactElement<AvatarItemProps> | React.ReactElement<AvatarItemProps>[];
};

const Item: React.FC<AvatarItemProps> = ({ src, size, tips, onClick = () => {} }) => {
  const cls = 'small';

  return (
    <li className={cls} onClick={onClick}>
      {tips ? (
        <Tooltip title={tips}>
          <Avatar src={src} size={size} style={{ cursor: 'pointer' }} />
        </Tooltip>
      ) : (
        <Avatar src={src} size={size} />
      )}
    </li>
  );
};


const AvatarList: React.FC<AvatarListProps> & { Item: typeof Item } = ({
  children,
  size,
  maxLength = 5,
  excessItemsStyle,
  ...other
}) => {
  const numOfChildren = React.Children.count(children);
  const numToShow = maxLength >= numOfChildren ? numOfChildren : maxLength;
  const childrenArray = React.Children.toArray(children) as React.ReactElement<AvatarItemProps>[];
  const childrenWithProps = childrenArray.slice(0, numToShow).map((child) =>
    React.cloneElement(child, {
      size,
    }),
  );

  if (numToShow < numOfChildren) {
    const cls = 'large';

    childrenWithProps.push(
      <li key="exceed" className={cls}>
        <Avatar size={size} style={excessItemsStyle}>{`+${numOfChildren - maxLength}`}</Avatar>
      </li>,
    );
  }

  return (
    <ComponentContainer>
      <div {...other} className="avatarList">
        <ul> {childrenWithProps} </ul>
      </div>
    </ComponentContainer>
  );
};

AvatarList.Item = Item;

export default AvatarList;
