import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const TimeSelectPanelBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  justify-content: center;
  grid-gap: 2px 2px;
  min-height: 270px;
  background-color: ${(props) => props.theme.palette.page};
  padding: 0px 8px 8px 8px;
`;

export default function TimeSelectPanelLayout(props: Props) {
  const { children } = props;
  return <TimeSelectPanelBox>{children}</TimeSelectPanelBox>;
}
