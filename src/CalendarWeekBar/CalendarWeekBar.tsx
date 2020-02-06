import React from 'react';
import CalendarWeekBarLayout from './CalendarWeekBarLayout';
import CalendarWeekDay from './CalendarWeekDay';

/**
 * 周面板组件
 */
function CalendarWeekBar() {
  const weeks = ['日', '一', '二', '三', '四', '五', '六'];

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
