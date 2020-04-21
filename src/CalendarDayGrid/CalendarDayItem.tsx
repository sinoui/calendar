import React from 'react';
import styled from 'styled-components';
import Subtitle1 from '@sinoui/core/Subtitle1';
import { Theme } from '@sinoui/theme';
import classNames from 'classnames';

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
   * 今天,并且没有选中任何
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
  /**
   * 是否禁止选择当前日期之前的日期
   */
  todayBeforeForbidden?: boolean;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * grid布局样式
   */
  style?: React.CSSProperties;
}

const backgroundFun = (props: {
  checked?: boolean;
  enable?: boolean;
  theme: Theme;
}) => {
  const { checked, enable } = props;
  if (checked) {
    return props.theme.palette.primary.main;
  }
  if (enable) {
    return props.theme.palette.background.default;
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
    return `1px solid ${props.theme.palette.primary.main}`;
  }
  if (today && !enable) {
    return `1px solid ${props.theme.palette.text.secondary}`;
  }
  return null;
};

const dayEachColor = (props: {
  checked?: boolean;
  todayBeforeForbidden?: boolean;
  theme: Theme;
}) => {
  if (props.checked) {
    return props.theme.palette.common.white;
  }
  if (props.todayBeforeForbidden) {
    return props.theme.palette.text.disabled;
  }
  return props.theme.palette.text.secondary;
};

const DayBox = styled.div<{
  dayNum?: number;
  checked?: boolean;
  today?: boolean;
  enable?: boolean;
  eachHeight?: number;
  todayBeforeForbidden?: boolean;
}>`
  border-radius: ${(props) => !props.eachHeight && '50%'};
  width: ${(props) => (props.eachHeight ? '100%' : '40px')};
  height: ${(props) => (props.eachHeight ? `${props.eachHeight}px` : '40px')};
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
    cursor: ${(props) =>
      !props.todayBeforeForbidden ? 'pointer' : 'not-allowed'};
    background: ${(props) =>
      !props.checked && props.dayNum && !props.todayBeforeForbidden
        ? props.theme.palette.action.hover
        : null};
  }
`;
const TitleBox = styled(Subtitle1)<{
  checked?: boolean;
  todayBeforeForbidden?: boolean;
  eachHeight?: number;
}>`
  color: ${(props) => dayEachColor(props)};
  width: 100%;
  height: 100%;
  display: block;
  line-height: ${(props) =>
    props.eachHeight ? `${props.eachHeight}px` : '40px'};
  text-align: center;
`;

/**
 * 日组件
 */
export default function CalendarDayItem(props: Props) {
  const {
    checked,
    today,
    enable,
    dayNum,
    selectDay,
    eachHeight,
    todayBeforeForbidden,
    className,
    style,
  } = props;

  return (
    <DayBox
      checked={checked}
      today={today}
      enable={enable}
      dayNum={dayNum}
      onClick={(e) => selectDay && dayNum && selectDay(dayNum, e)}
      eachHeight={eachHeight}
      todayBeforeForbidden={todayBeforeForbidden}
      className={classNames('sinoui-calendar-eachDay', className, {
        'sinoui-calendar--dayChecked': checked,
        'sinoui-calendar--dayEnable': enable,
        'sinoui-calendar--dayTodyAndChecked': today && checked,
        'sinoui-calendar--dayHaveChecked': today && !enable,
        'sinoui-calendar--dayForbidden': todayBeforeForbidden,
      })}
      style={style}
    >
      <TitleBox
        checked={checked}
        todayBeforeForbidden={todayBeforeForbidden}
        eachHeight={eachHeight}
      >
        {dayNum}
      </TitleBox>
    </DayBox>
  );
}
