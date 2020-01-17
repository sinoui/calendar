import React from 'react';
import styled from 'styled-components';
import { Body2 } from 'sinoui-components/Text';
import dayjs from 'dayjs';
import CalendarDayGridLayout from './CalendarDayGridLayout';
import CalendarDayItem from './CalendarDayItem';

const Month = styled.div<{ eachHeight?: number }>`
  display: grid;
  justify-items: start;
  align-items: center;
  width: 75px;
  height: ${(props) => (props.eachHeight ? `${props.eachHeight}px` : '40px')};
  position: absolute;
  padding-left: 14px;
`;

export interface Props {
  monthLastChecked?: number;
  yearLastChecked?: number;
  monthChecked: number;
  yearChecked?: number;
  isLastChecked?: boolean;
  dayNum?: number;
  selectDay?: (value: number, e: React.MouseEvent) => void;
  eachHeight?: number;
}

export default function CalendarDayGrid(props: Props) {
  const isChecked = (dayNum: number) => {
    if (
      dayNum === props.dayNum &&
      props.isLastChecked &&
      props.monthChecked === props.monthLastChecked
    ) {
      return true;
    }
    return false;
  };

  const isToday = (dayNum: number) => {
    const today = dayjs();
    const dayNow = today.date();
    const monthNow = today.month() + 1;
    const yearNow = today.year();

    if (
      dayNum === dayNow &&
      yearNow === props.yearChecked &&
      monthNow === props.monthChecked
    ) {
      return true;
    }
    return false;
  };

  const isEnable = (dayNum: number) => {
    const today = dayjs();
    const monthNow = today.month() + 1;

    if (
      dayNum === props.dayNum &&
      monthNow === props.monthChecked &&
      !props.isLastChecked
    ) {
      return true;
    }
    return false;
  };

  /**
   * 获取每个月的天数数据
   *
   * @param {number} yearMonth
   * @returns
   */
  const getDayDate = (yearMonth: string) => {
    const today = dayjs();
    const year = today.year();
    const month = props.monthChecked;
    const firstday = dayjs(`${yearMonth}-01`);
    const monthDay = dayjs(new Date(year, month, 0));
    const weekDay = firstday.day(); // 获取周几
    const monthDayNum = monthDay.date(); // 获取每个月的天数
    const dayArr = [];
    if (weekDay > 0) {
      // eslint-disable-next-line no-plusplus
      for (let i = 1; i <= weekDay; i++) {
        dayArr.push(<CalendarDayItem eachHeight={props.eachHeight} />);
      }
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= monthDayNum; i++) {
      dayArr.push(
        <CalendarDayItem
          dayNum={i}
          selectDay={props.selectDay}
          checked={isChecked(i)}
          enable={isEnable(i)}
          today={isToday(i)}
          eachHeight={props.eachHeight}
        />,
      );
    }
    return { dayArr, month, weekDay };
  };

  const getMonthData = (month: number) => {
    let monthCh;
    switch (month) {
      case 1:
        monthCh = '一月';
        break;
      case 2:
        monthCh = '二月';
        break;
      case 3:
        monthCh = '三月';
        break;
      case 4:
        monthCh = '四月';
        break;
      case 5:
        monthCh = '五月';
        break;
      case 6:
        monthCh = '六月';
        break;
      case 7:
        monthCh = '七月';
        break;
      case 8:
        monthCh = '八月';
        break;
      case 9:
        monthCh = '九月';
        break;
      case 10:
        monthCh = '十月';
        break;
      case 11:
        monthCh = '十一月';
        break;
      default:
        monthCh = '十二月';
    }
    return monthCh;
  };

  const { yearChecked, monthChecked, eachHeight } = props;
  const yearMonth = `${yearChecked}-${monthChecked}`;
  const dayObj = getDayDate(yearMonth);
  const monthCh = getMonthData(monthChecked);
  const { dayArr, weekDay } = dayObj;

  return (
    <>
      <Month eachHeight={eachHeight}>
        <Body2>{monthCh}</Body2>
      </Month>
      {weekDay <= 1 ? <br /> : null}
      <CalendarDayGridLayout weekDay={weekDay}>
        {dayArr.map((day) => day)}
      </CalendarDayGridLayout>
    </>
  );
}
