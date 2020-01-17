import React from 'react';
import styled from 'styled-components';

const CalendarHeaderBox = styled.div`
  display: flex;
  height: 54px;
  padding: 0px 8px 0px 0px;
`;

interface Props {
  children: React.ReactNode;
}

function CalendarHeaderLayout(props: Props) {
  const { children } = props;
  return <CalendarHeaderBox>{children}</CalendarHeaderBox>;
}

export default CalendarHeaderLayout;
