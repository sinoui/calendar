import React from 'react';
import styled from 'styled-components';
import Subtitle1 from '@sinoui/core/Subtitle1';
import { Theme } from '@sinoui/theme';

export interface Props {
  /**
   * 月份（一月份）
   */
  title?: string;
  /**
   * 是否是同一个月
   */
  sameMonth?: boolean;
  /**
   * 是否被选中
   */
  checked?: boolean;
  /**
   * 选择月的回调函数
   */
  selectMonth: (value: number) => void;
  /**
   * 是否当前月
   */
  enable?: boolean;
  /**
   * 月份（1）
   */
  monthNum: number;
  /**
   * 设置每个格子的高度
   */
  eachHeight?: number;
  /**
   * 是否禁止选择当前日期之前的日期
   */
  todayBeforeForbidden?: boolean;
  /**
   * grid布局样式
   */
  style?: React.CSSProperties;
}

const backgroundFun = (props: {
  checked?: boolean;
  enable?: boolean;
  theme?: Theme;
}) => {
  const { checked, enable } = props;
  if (checked) {
    return props.theme && props.theme.palette.primary.main;
  }
  if (enable) {
    return props.theme && props.theme.palette.background.default;
  }
  return null;
};

const borderFun = (props: {
  checked?: boolean;
  sameMonth?: boolean;
  theme?: Theme;
}) => {
  const { sameMonth, checked } = props;
  if (sameMonth && checked) {
    return props.theme && `1px solid ${props.theme.palette.primary.main}`;
  }
  if (sameMonth) {
    return props.theme && `1px solid ${props.theme.palette.text.secondary}`;
  }
  return null;
};

const monthEachColor = (props: {
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

const MonthBox = styled.div<{
  sameMonth?: boolean;
  checked?: boolean;
  enable?: boolean;
  eachHeight?: number;
  todayBeforeForbidden?: boolean;
}>`
  width: ${(props) => (props.eachHeight ? '100%' : '60px')};
  height: ${(props) => (props.eachHeight ? `${props.eachHeight}px` : '32px')};
  margin: 2px 0;
  border-radius: ${(props) => !props.eachHeight && '999px'};
  display: grid;
  justify-content: center;
  align-items: center;
  background: ${(props) => backgroundFun(props)};
  border: ${(props) => borderFun(props)};
  box-shadow: ${(props) =>
    props.sameMonth
      ? `inset 0 0 0 1px ${props.theme.palette.background.paper}`
      : null};
  &:hover {
    cursor: ${(props) =>
      !props.todayBeforeForbidden ? 'pointer' : 'not-allowed'};
    background: ${(props) =>
      !props.checked && !props.todayBeforeForbidden
        ? props.theme.palette.action.hover
        : null};
  }
`;

const TitleBox = styled(Subtitle1)<{
  checked?: boolean;
  todayBeforeForbidden?: boolean;
  eachHeight?: number;
}>`
  color: ${(props) => monthEachColor(props)};
  display: block;
  width: 100%;
  height: 100%;
  line-height: ${(props) =>
    props.eachHeight ? `${props.eachHeight}px` : '32px'};
  text-align: center;
`;

/**
 * 月组件
 */
export default function MonthItem(props: Props) {
  const {
    sameMonth,
    checked,
    selectMonth,
    monthNum,
    enable,
    eachHeight,
    title,
    todayBeforeForbidden,
    style,
  } = props;
  return (
    <MonthBox
      sameMonth={sameMonth}
      checked={checked}
      onClick={() => selectMonth(monthNum)}
      enable={enable}
      eachHeight={eachHeight}
      todayBeforeForbidden={todayBeforeForbidden}
      style={style}
    >
      <TitleBox
        checked={checked}
        todayBeforeForbidden={todayBeforeForbidden}
        eachHeight={eachHeight}
      >
        {title}
      </TitleBox>
    </MonthBox>
  );
}
