import React from 'react';
import styled from 'styled-components';

const MonthSelectPanelBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  justify-content: center;
  justify-items: center;
  align-items: center;
  grid-row-gap: 2px;
  grid-column-gap: 2px;
  padding: 0 8px 8px 8px;
  min-height: 230px;
`;

interface Props {
  children: React.ReactNode;
}

export default function CalendarDayGridLayout(props: Props) {
  const { children } = props;
  return (
    <MonthSelectPanelBox className="sinoui-calendar-month">
      {children}
    </MonthSelectPanelBox>
  );
}
