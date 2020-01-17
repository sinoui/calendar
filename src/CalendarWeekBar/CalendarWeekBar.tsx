import React from 'react';
import CalendarWeekBarLayout from './CalendarWeekBarLayout';
import CalendarWeekDay from './CalendarWeekDay';

function CalendarWeekBar() {
  return (
    <CalendarWeekBarLayout>
      <CalendarWeekDay>日</CalendarWeekDay>
      <CalendarWeekDay>一</CalendarWeekDay>
      <CalendarWeekDay>二</CalendarWeekDay>
      <CalendarWeekDay>三</CalendarWeekDay>
      <CalendarWeekDay>四</CalendarWeekDay>
      <CalendarWeekDay>五</CalendarWeekDay>
      <CalendarWeekDay>六</CalendarWeekDay>
    </CalendarWeekBarLayout>
  );
}

export default CalendarWeekBar;
