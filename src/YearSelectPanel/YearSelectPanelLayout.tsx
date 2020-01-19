import React from 'react';
import styled from 'styled-components';

const YearSelectPanelBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  justify-content: center;
  justify-items: center;
  align-items: center;
  grid-row-gap: 2px;
  grid-column-gap: 2px;
  padding: 0 8px 8px 8px;
  min-height: 270px;
`;

interface Props {
  children: React.ReactNode;
}

export default function YearSelectPanelLayout(props: Props) {
  const { children } = props;
  return (
    <YearSelectPanelBox className="sinoui-calendar-year">
      {children}
    </YearSelectPanelBox>
  );
}
