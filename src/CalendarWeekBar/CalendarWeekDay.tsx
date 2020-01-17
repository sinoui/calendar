import React from 'react';
import { Caption } from 'sinoui-components/Text';
import styled from 'styled-components';

const CalendarWeekDayBox = styled(Caption)`
  width: 40px;
  display: grid;
  justify-content: center;
`;

interface Props {
  children: string;
}

function CalendarWeekDay(props: Props) {
  const { children } = props;
  return <CalendarWeekDayBox>{children}</CalendarWeekDayBox>;
}

export default CalendarWeekDay;
