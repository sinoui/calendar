import React from 'react';
import styled from 'styled-components';
import Paper from 'sinoui-components/Paper';

const CalendarBox = styled(Paper)`
  width: 100%;
  box-sizing: content-box;
  min-width: 300px;
`;

interface Props {
  children: React.ReactNode;
}

export default function CalendarLayout(props: Props) {
  const { children } = props;
  return <CalendarBox>{children}</CalendarBox>;
}
