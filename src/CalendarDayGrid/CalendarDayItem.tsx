import React from 'react';
import styled from 'styled-components';
import { Subheading } from 'sinoui-components/Text';
import { Theme } from '@sinoui/theme';

export interface Props {
  /**
   * 选择的日
   */
  dayNum?: number;
  /**
   * 是否选中
   */
  checked?: boolean;
  /**
   * 是否是今天
   */
  today?: boolean;
  /**
   * 是否选中的天
   */
  enable?: boolean;
  /**
   * 选择天的回调函数
   */
  selectDay?: (value: number, e: React.MouseEvent) => void;
  /**
   * 每个格子的高度
   */
  eachHeight?: number;
}

const backgroundFun = (props: {
  checked?: boolean;
  enable?: boolean;
  theme: Theme;
}) => {
  const { checked, enable } = props;
  if (checked) {
    return props.theme.palette.primary[500];
  }
  if (enable) {
    return props.theme.palette.background.divider;
  }
  return null;
};

const borderFun = (props: {
  enable?: boolean;
  checked?: boolean;
  today?: boolean;
  theme: Theme;
}) => {
  const { today, checked, enable } = props;
  if (today && checked) {
    return `1px solid ${props.theme.palette.primary[500]}`;
  }
  if (today && !enable) {
    return `1px solid ${props.theme.palette.text.secondary}`;
  }
  return null;
};

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
  background: ${(props) => backgroundFun(props)};
  border: ${(props) => borderFun(props)};
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

/**
 * 日组件
 */
export default function CalendarDayItem(props: Props) {
  const { checked, today, enable, dayNum, selectDay, eachHeight } = props;
  return (
    <DayBox
      checked={checked}
      today={today}
      enable={enable}
      dayNum={dayNum}
      onClick={(e) => selectDay && dayNum && selectDay(dayNum, e)}
      eachHeight={eachHeight}
    >
      <TitleBox checked={checked}>{dayNum}</TitleBox>
    </DayBox>
  );
}
