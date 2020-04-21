import React from 'react';
import Caption from '@sinoui/core/Caption';
import styled from 'styled-components';

/**
 * 周显示组件
 */
const CalendarWeekDay = styled(Caption)`
  width: 40px;
  display: grid;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  display: block;
  line-height: 14px;
`;

export interface Props {
  children: React.ReactNode;
  /**
   * grid布局样式
   */
  style?: React.CSSProperties;
}

function CalendarWeekDayContent(props: Props) {
  const { children, style } = props;
  return <CalendarWeekDay style={style}>{children}</CalendarWeekDay>;
}

export default CalendarWeekDayContent;
