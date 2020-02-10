import React from 'react';
import CalendarWeekBarLayout from './CalendarWeekBarLayout';
import CalendarWeekDay from './CalendarWeekDay';

interface Props {
  /**
   * 是否第一列显示周一
   */
  isFirstColJanu?: boolean;
}

/**
 * 周面板组件
 */
function CalendarWeekBar(props: Props) {
  const { isFirstColJanu } = props;
  const weeks = isFirstColJanu
    ? ['一', '二', '三', '四', '五', '六', '日']
    : ['日', '一', '二', '三', '四', '五', '六'];

  const children = (
    <>
      {weeks.map((weekDay) => (
        <CalendarWeekDay key={weekDay}>{weekDay}</CalendarWeekDay>
      ))}
    </>
  );

  return <CalendarWeekBarLayout>{children}</CalendarWeekBarLayout>;
}

export default CalendarWeekBar;
