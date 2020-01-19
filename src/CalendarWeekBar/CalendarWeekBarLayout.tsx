import React from 'react';
import styled from 'styled-components';

const CalendarWeekBarBox = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 14.29%);
  justify-items: center;
  align-items: center;
  height: 14px;
  line-height: 14px;
  padding: 0 8px 10px 8px;
`;

interface Props {
  children: React.ReactNode;
}

function CalendarWeekBarLayout(props: Props) {
  const { children } = props;
  return (
    <CalendarWeekBarBox className="sinoui-calendar-week">
      {children}
    </CalendarWeekBarBox>
  );
}

export default CalendarWeekBarLayout;
