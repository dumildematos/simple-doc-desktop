import { Card } from 'antd';
import type { CardProps } from 'antd/es/card';
import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

const CardContainer = styled.div`
  .chartCard {
    position: relative;
    .chartTop {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .chartTopMargin {
      margin-bottom: 12px;
    }
    .chartTopHasMargin {
      margin-bottom: 20px;
    }
    .metaWrap {
      float: left;
    }
    .avatar {
      position: relative;
      top: 4px;
      float: left;
      margin-right: 20px;
      img {
        border-radius: 100%;
      }
    }
    .meta {
      height: 22px;
      color: @text-color-secondary;
      font-size: @font-size-base;
      line-height: 22px;
    }
    .action {
      position: absolute;
      top: 4px;
      right: 0;
      line-height: 1;
      cursor: pointer;
    }
    .total {
      height: 38px;
      margin-top: 4px;
      margin-bottom: 0;
      overflow: hidden;
      color: @heading-color;
      font-size: 30px;
      line-height: 38px;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
    }
    .content {
      position: relative;
      width: 100%;
      margin-bottom: 12px;
    }
    .contentFixed {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }
    .footer {
      margin-top: 8px;
      padding-top: 9px;
      border-top: 1px solid @border-color-split;
      & > * {
        position: relative;
      }
    }
    .footerMargin {
      margin-top: 20px;
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/naming-convention
type totalType = () => React.ReactNode;

const renderTotal = (total?: number | totalType | React.ReactNode) => {
  if (!total && total !== 0) {
    return null;
  }
  let totalDom;
  switch (typeof total) {
    case 'undefined':
      totalDom = null;
      break;
    case 'function':
      totalDom = <div className="total">{total()}</div>;
      break;
    default:
      totalDom = <div className="total">{total}</div>;
  }
  return totalDom;
};

export type ChartCardProps = {
  title: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  action?: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  total?: React.ReactNode | number | (() => React.ReactNode | number);
  // eslint-disable-next-line react/require-default-props
  footer?: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  contentHeight?: number;
  // eslint-disable-next-line react/require-default-props
  avatar?: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  style?: React.CSSProperties;
} & CardProps;

class ChartCard extends React.Component<ChartCardProps> {
  renderContent = () => {
    const {
      contentHeight,
      title,
      avatar,
      action,
      total,
      footer,
      children,
      loading,
    } = this.props;
    if (loading) {
      return false;
    }
    return (
      <CardContainer>
        <div className="chartCard">
          <div
            className={classNames('chartTop', {
              chartTopMargin: !children && !footer,
            })}
          >
            <div className="avatar">{avatar}</div>
            <div className="metaWrap">
              <div className="meta">
                <span className="title">{title}</span>
                <span className="action">{action}</span>
              </div>
              {renderTotal(total)}
            </div>
          </div>
          {children && (
            <div
              className="content"
              style={{ height: contentHeight || 'auto' }}
            >
              <div className="contentHeight contentFixed">{children}</div>
            </div>
          )}
          {footer && (
            <div
              className={classNames(footer, {
                footerMargin: !children,
              })}
            >
              {footer}
            </div>
          )}
        </div>
      </CardContainer>
    );
  };

  render() {
    const {
      loading = false,
      contentHeight,
      title,
      avatar,
      action,
      total,
      footer,
      children,
      ...rest
    } = this.props;
    return (
      <Card
        loading={loading}
        bodyStyle={{ padding: '20px 24px 8px 24px' }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        {this.renderContent()}
      </Card>
    );
  }
}

export default ChartCard;
