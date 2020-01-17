import React from 'react';
import styled from 'styled-components';
import { Subheading } from 'sinoui-components/Text';

export interface Props {
  title?: string;
  sameMonth?: boolean;
  checked?: boolean;
  selectMonth: (value: number) => void;
  enable?: boolean;
  monthNum: number;
  eachHeight?: number;
}

const MonthBox = styled.div<{
  sameMonth?: boolean;
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
    props.sameMonth ? `1px solid ${props.theme.palette.text.secondary}` : null};
  border: ${(props) =>
    props.sameMonth && props.checked
      ? `1px solid ${props.theme.palette.primary[500]}`
      : null};
  box-shadow: ${(props) =>
    props.sameMonth
      ? `inset 0 0 0 1px ${props.theme.palette.background.paper}`
      : null};
  &:hover {
    cursor: pointer;
    background: ${(props) =>
      !props.checked ? props.theme.palette.background.appBar : null};
  }
`;

const TitleBox = styled(Subheading)<{ checked?: boolean }>`
  color: ${(props) =>
    props.checked
      ? props.theme.palette.text.snackbar
      : props.theme.palette.text.secondary};
`;

export default function MonthItem(props: Props) {
  const {
    sameMonth,
    checked,
    selectMonth,
    monthNum,
    enable,
    eachHeight,
    title,
  } = props;
  return (
    <MonthBox
      sameMonth={sameMonth}
      checked={checked}
      onClick={() => selectMonth(monthNum)}
      enable={enable}
      eachHeight={eachHeight}
    >
      <TitleBox checked={checked}>{title}</TitleBox>
    </MonthBox>
  );
}
