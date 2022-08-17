import React from 'react';

import styled from 'styled-components';

const FieldContainer = styled.div`
  .field {
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .label,
    .number {
      font-size: @font-size-base;
      line-height: 22px;
    }
    .number {
      margin-left: 8px;
      color: @heading-color;
    }
  }
`;

export type FieldProps = {
  label: React.ReactNode;
  value: React.ReactNode;
  style?: React.CSSProperties;
};

const Field: React.FC<FieldProps> = ({ label, value, ...rest }) => (
  <FieldContainer>
    <div className={...rest}>
      <span className="label">{label}</span>
      <span className="number">{value}</span>
    </div>
  </FieldContainer>
);

export default Field;
