import React from 'react';
import styled from 'styled-components';

const CalendarDayGridBox = styled.div<{ weekDay?: number }>`
  display: grid;
  grid-template-columns: repeat(7, 14.29%);
  justify-content: center;
  justify-items: center;
  align-items: center;
  grid-row-gap: 2px;
  grid-column-gap: 2px;
  padding: 0 8px 8px 8px;
  margin-top: ${(props) =>
    props.weekDay && props.weekDay <= 2 ? '18px' : '0px'};
  min-height: 246px;
`;

interface Props {
  children: React.ReactNode;
  weekDay?: number;
}

export default function CalendarDayGridLayout(props: Props) {
  const { weekDay, children } = props;
  return <CalendarDayGridBox weekDay={weekDay}>{children}</CalendarDayGridBox>;
}
