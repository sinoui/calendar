import React from 'react';
import styled from 'styled-components';
import { Subheading } from 'sinoui-components/Text';
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
}

const backgroundFun = (props: {
  checked?: boolean;
  enable?: boolean;
  theme?: Theme;
}) => {
  const { checked, enable } = props;
  if (checked) {
    return props.theme && props.theme.palette.primary[500];
  }
  if (enable) {
    return props.theme && props.theme.palette.background.divider;
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
    return props.theme && `1px solid ${props.theme.palette.primary[500]}`;
  }
  if (sameMonth) {
    return props.theme && `1px solid ${props.theme.palette.text.secondary}`;
  }
  return null;
};

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
  background: ${(props) => backgroundFun(props)};
  border: ${(props) => borderFun(props)};
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
