import React from 'react';
import styled from 'styled-components';
import { Subheading } from 'sinoui-components/Text';

export interface Props {
  dayNum?: number;
  checked?: boolean;
  today?: boolean;
  enable?: boolean;
  selectDay?: (value: number, e: React.MouseEvent) => void;
  eachHeight?: number;
}

const DayBox = styled.div<{
  dayNum?: number;
  checked?: boolean;
  today?: boolean;
  enable?: boolean;
  eachHeight?: number;
}>`
  border-radius: ${(props) => !props.eachHeight && '50%'};
  width: ${(props) => (props.eachHeight ? '100%' : '40px')};
  height: ${(props) => (props.eachHeight ? `${props.eachHeight}px` : '40px')};
  padding: 4px;
  box-sizing: border-box;
  display: grid;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.checked ? props.theme.palette.primary[500] : null};
  background: ${(props) =>
    props.enable ? props.theme.palette.background.divider : null};
  border: ${(props) =>
    props.today && !props.enable
      ? `1px solid ${props.theme.palette.text.secondary}`
      : null};
  border: ${(props) =>
    props.today && props.checked
      ? `1px solid ${props.theme.palette.primary[500]}`
      : null};
  box-shadow: ${(props) =>
    props.today
      ? `inset 0 0 0 1px ${props.theme.palette.background.paper}`
      : null};
  &:hover {
    cursor: pointer;
    background: ${(props) =>
      !props.checked && props.dayNum
        ? props.theme.palette.background.appBar
        : null};
  }
`;
const TitleBox = styled(Subheading)<{ checked?: boolean }>`
  color: ${(props) =>
    props.checked
      ? props.theme.palette.text.snackbar
      : props.theme.palette.text.secondary};
`;

export default function CalendarDayItem(props: Props) {
  const { checked, today, enable, dayNum, selectDay, eachHeight } = props;
  return (
    <DayBox
      checked={checked}
      today={today}
      enable={enable}
      dayNum={dayNum}
      onClick={(e) => selectDay(dayNum, e)}
      eachHeight={eachHeight}
    >
      <TitleBox checked={checked}>{dayNum}</TitleBox>
    </DayBox>
  );
}
