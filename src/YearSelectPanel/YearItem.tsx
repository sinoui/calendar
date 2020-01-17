import React from 'react';
import styled from 'styled-components';
import { Body1 } from 'sinoui-components/Text';

export interface Props {
  title: string;
  sameYear?: boolean;
  checked?: boolean;
  selectYear: (value: string) => void;
  enable?: boolean;
  eachHeight?: number;
}

const YearBox = styled.div<{
  sameYear?: boolean;
  checked?: boolean;
  enable?: boolean;
  eachHeight?: number;
}>`
  width: ${(props) => (props.eachHeight ? '100%' : '60px')};
  height: ${(props) => (props.eachHeight ? `${props.eachHeight}px` : '32px')};
  margin: 2px 0;
  border-radius: ${(props) => !props.eachHeight && '999px'};
  display: grid;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.checked ? props.theme.palette.primary[500] : null};
  background: ${(props) =>
    props.enable ? props.theme.palette.background.divider : null};
  border: ${(props) =>
    props.sameYear ? `1px solid ${props.theme.palette.text.secondary}` : null};
  border: ${(props) =>
    props.sameYear && props.checked
      ? `1px solid ${props.theme.palette.primary[500]}`
      : null};
  box-shadow: ${(props) =>
    props.sameYear
      ? `inset 0 0 0 1px ${props.theme.palette.background.paper}`
      : null};

  &:hover {
    cursor: pointer;
    background: ${(props) =>
      !props.checked ? props.theme.palette.background.appBar : null};
  }
`;

const TitleBox = styled(Body1)<{ checked?: boolean }>`
  color: ${(props) =>
    props.checked
      ? props.theme.palette.text.snackbar
      : props.theme.palette.text.secondary};
`;

export default function YearItem(props: Props) {
  const { sameYear, checked, selectYear, title, enable, eachHeight } = props;
  return (
    <YearBox
      sameYear={sameYear}
      checked={checked}
      onClick={() => selectYear(title)}
      enable={enable}
      eachHeight={eachHeight}
    >
      <TitleBox checked={checked}>{title}</TitleBox>
    </YearBox>
  );
}
