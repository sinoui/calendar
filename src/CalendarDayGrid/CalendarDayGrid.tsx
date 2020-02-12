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
  /**
   * 最后选择的月份
   */
  monthLastChecked?: number;
  /**
   * 最后选择的年
   */
  yearLastChecked?: number;
  /**
   * 选择的月份
   */
  monthChecked: number;
  /**
   * 选择的年
   */
  yearChecked?: number;
  /**
   * 是否最后选中
   */
  isLastChecked?: boolean;
  /**
   * 选择的日
   */
  dayNum?: number;
  /**
   * 点击天的回调函数
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
   * 最大值
   */
  max?: string;
  /**
   * 最小值
   */
  min?: string;
  /**
   * 是否显示时间
   */
  showTime?: string;
  /**
   * 是否第一列显示周一
   */
  isFirstColJanu?: boolean;
}

/**
 * 日面板组件
 */
export default function CalendarDayGrid(props: Props) {
  const isChecked = (dayNum: number) => {
    return (
      dayNum === props.dayNum &&
      props.isLastChecked &&
      props.monthChecked === props.monthLastChecked
    );
  };

  const isToday = (dayNum: number) => {
    const today = dayjs();
    const dayNow = today.date();
    const monthNow = today.month() + 1;
    const yearNow = today.year();

    return (
      dayNum === dayNow &&
      yearNow === props.yearChecked &&
      monthNow === props.monthChecked
    );
  };

  const isEnable = (dayNum: number) => {
    const today = dayjs();
    const monthNow = today.month() + 1;

    return (
      dayNum === props.dayNum &&
      monthNow === props.monthChecked &&
      !props.isLastChecked
    );
  };

  const isTodayBeforeForbidden = (i: number) => {
    const {
      todayBeforeForbidden,
      yearChecked,
      monthChecked,
      max,
      min,
      showTime,
    } = props;
    const selectDayVal = `${yearChecked}-${monthChecked
      .toString()
      .padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
    if (
      (todayBeforeForbidden && selectDayVal < dayjs().format('YYYY-MM-DD')) ||
      (!showTime &&
        ((max && min && selectDayVal > max && selectDayVal < min) ||
          (max && selectDayVal > max) ||
          (min && selectDayVal < min)))
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
    if (props.isFirstColJanu) {
      if (weekDay === 0) {
        for (let i = 1; i <= 6; i += 1) {
          dayArr.push(
            <CalendarDayItem eachHeight={props.eachHeight} key={`${i}11`} />,
          );
        }
      }
      if (weekDay > 1) {
        for (let i = 1; i <= weekDay - 1; i += 1) {
          dayArr.push(
            <CalendarDayItem eachHeight={props.eachHeight} key={`${i}22`} />,
          );
        }
      }

      for (let i = 1; i <= monthDayNum; i += 1) {
        dayArr.push(
          <CalendarDayItem
            dayNum={i}
            key={i}
            selectDay={props.selectDay}
            checked={isChecked(i)}
            enable={isEnable(i)}
            today={isToday(i)}
            eachHeight={props.eachHeight}
            todayBeforeForbidden={isTodayBeforeForbidden(i)}
          />,
        );
      }
    } else {
      if (weekDay > 0) {
        for (let i = 1; i <= weekDay; i += 1) {
          dayArr.push(
            <CalendarDayItem
              eachHeight={props.eachHeight}
              key={`${i}11`}
              className="sinoui-calendar--dayItem sinoui-calendar--dayEach"
            />,
          );
        }
      }

      for (let i = 1; i <= monthDayNum; i += 1) {
        dayArr.push(
          <CalendarDayItem
            dayNum={i}
            key={i}
            selectDay={props.selectDay}
            checked={isChecked(i)}
            enable={isEnable(i)}
            today={isToday(i)}
            eachHeight={props.eachHeight}
            todayBeforeForbidden={isTodayBeforeForbidden(i)}
            className="sinoui-calendar--dayEach"
            clickDay={props.clickDay}
          />,
        );
      }
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
        <Body2 data-testid="calendarMonth">{monthCh}</Body2>
      </Month>
      {weekDay <= 1 ? <br /> : null}
      <CalendarDayGridLayout>{dayArr.map((day) => day)}</CalendarDayGridLayout>
    </>
  );
}
