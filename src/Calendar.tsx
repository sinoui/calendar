import React, { useState, useEffect } from 'react';
import Divider from 'sinoui-components/Divider';
import dayjs from 'dayjs';
import CalendarDayGrid from './CalendarDayGrid';
import CalendarHeader from './CalendarHeader';
import CalendarWeekBar from './CalendarWeekBar';
import MonthSelectPanel from './MonthSelectPanel';
import YearSelectPanel from './YearSelectPanel';
import CalendarLayout from './CalendarLayout';
import TimeSelectPanel, { TimeButton } from './TimeSelectPanel';

export interface Props {
  /**
   * 选中的日期
   */
  dateTime?: string;
  /**
   * 日期选择事件监听
   */
  onChange: (value: string) => void;
  /**
   * 是否禁止选择当前日期之前的日期
   */
  todayBeforeForbidden?: boolean;
  /**
   * 只是选择年月
   */
  onlyYearMonth?: boolean;
  /**
   * 设置每个格子的高度
   */
  eachHeight?: number;
  /**
   * 是否显示时间
   */
  showTime?: boolean;
  modelState: number;
  monthLastChecked: number;
  yearLastChecked: number;
  monthChecked: number;
  yearChecked: number;
  prevAndNext: number;
  isLastChecked: boolean;
  day: number;
  allDayLastChecked: string | number;
  onOk: () => void;
}

function Calendar(props: Props) {
  const now = new Date();
  const monthNow = now.getMonth() + 1;
  const yearNow = now.getFullYear();
  const hour = now
    .getHours()
    .toString()
    .padStart(2, '0');
  const minute = now
    .getMinutes()
    .toString()
    .padStart(2, '0');
  const second = now
    .getSeconds()
    .toString()
    .padStart(2, '0');
  const { onlyYearMonth } = props;

  const [modelState, setModelState] = useState(onlyYearMonth ? 2 : 0);
  const [monthLastChecked, setMonthLastChecked] = useState(monthNow);
  const [yearLastChecked, setYearLastChecked] = useState(yearNow);
  const [monthChecked, setMonthChecked] = useState(monthNow);
  const [yearChecked, setYearChecked] = useState(yearNow);
  const [prevAndNext, setPrevAndNext] = useState(0);
  const [day, setDay] = useState(0);
  const [isLastChecked, setIsLastChecked] = useState(false);
  const [allDayLastChecked, setAllDayLastChecked] = useState('');
  const [timeOpen, setTimeOpen] = useState(false);
  const [time, setTime] = useState(`${hour}:${minute}:${second}`);

  /**
   * 初始化日期
   *
   * @param {*} dateTime
   * @memberof Calendar
   */
  const dateInit = (dateStr?: string) => {
    const date = dateStr ? dayjs(dateStr) : dayjs();
    const month = date.month() + 1;
    const year = date.year();
    const dayVal = date.date();

    setIsLastChecked(dateStr ? true : isLastChecked);
    setMonthLastChecked(month);
    setYearLastChecked(year);
    setMonthChecked(month);
    setYearChecked(year);
    setDay(dayVal);

    if (props.showTime) {
      const hours = date
        .hour()
        .toString()
        .padStart(2, '0');
      const minutes = date
        .minute()
        .toString()
        .padStart(2, '0');
      const seconds = date
        .second()
        .toString()
        .padStart(2, '0');

      setTime(`${hours}:${minutes}:${seconds}`);
    }
  };

  useEffect(() => {
    const { dateTime } = props;
    dateInit(dateTime);
  }, []);

  /**
   * 点击日历头  年部分切换日历主体
   *
   * @memberof Calendar
   */
  const changeModelState = () => {
    if (props.onlyYearMonth && (modelState === 1 || modelState === 2)) {
      setModelState(1);
    } else if (!props.onlyYearMonth && (modelState === 1 || modelState === 2)) {
      setModelState(0);
    } else {
      setModelState(1);
    }
  };

  /**
   * 在主体部分
   * 选择年切换月份
   *
   * @memberof Calendar
   */
  const checkYear = (yearNum: string) => {
    if (modelState === 2) {
      setModelState(0);
      setYearChecked(parseInt(yearNum, 10));
      setIsLastChecked(false);
    } else {
      setModelState(2);
      setYearChecked(parseInt(yearNum, 10));
    }
  };

  /**
   * 在主体部分
   * 选择月份，切换为日期
   *
   * @memberof Calendar
   */
  const checkMonth = (monthNum: number) => {
    setModelState(0);
    setMonthChecked(monthNum);
    setIsLastChecked(false);

    // 选择月抛出事件
    if (props.onlyYearMonth) {
      if (props.onChange) {
        props.onChange(
          `${yearChecked}-${monthNum.toString().padStart(2, '0')}`,
        );
      }
    }
  };

  /**
   * 抛出的onChange事件
   */
  const renderValue = () => {
    if (props.onChange) {
      if (props.showTime) {
        props.onChange(
          `${yearChecked}-${monthChecked
            .toString()
            .padStart(2, '0')}-${day.toString().padStart(2, '0')} ${time}`,
        );
      } else {
        props.onChange(
          `${yearChecked}-${monthChecked
            .toString()
            .padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
        );
      }
    }
  };

  /**
   * 点击天
   * @param day
   * @param e
   */
  const selectDay = (dayVal: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const selectDayVal = `${yearChecked}-${monthChecked
      .toString()
      .padStart(2, '0')}-${dayVal.toString().padStart(2, '0')}`;

    const { todayBeforeForbidden } = props;
    if (todayBeforeForbidden && selectDayVal < dayjs().format('YYYY-MM-DD')) {
      return;
    }

    setDay(dayVal);
    setYearLastChecked(yearChecked);
    setIsLastChecked(true);
    setMonthLastChecked(monthChecked);
    setAllDayLastChecked(`${yearChecked}-${monthChecked}-${dayVal}`);

    renderValue();
  };

  /**
   * 上一个月
   */

  const prevButton = () => {
    if (modelState === 1) {
      setPrevAndNext(prevAndNext - 1);
    }
    if (modelState === 0) {
      setMonthChecked(monthChecked - 1);
      if (monthChecked === 1) {
        setYearChecked(yearChecked - 1);
        setMonthChecked(12);
      }
    }
    if (modelState === 2) {
      setYearChecked(yearChecked - 1);
    }
  };

  /**
   * 下一个月
   */
  const nextButton = () => {
    if (modelState === 1) {
      setPrevAndNext(prevAndNext + 1);
    }

    if (modelState === 0) {
      setMonthChecked(monthChecked + 1);
      if (monthChecked === 12) {
        setYearChecked(yearChecked + 1);
        setMonthChecked(1);
      }
    }
    if (modelState === 2) {
      setYearChecked(yearChecked + 1);
    }
  };

  let model: JSX.Element;
  switch (modelState) {
    case 0:
      model = (
        <CalendarDayGrid
          monthChecked={monthChecked}
          yearChecked={yearChecked}
          monthLastChecked={monthLastChecked}
          yearLastChecked={yearLastChecked}
          selectDay={selectDay}
          dayNum={day}
          isLastChecked={isLastChecked}
          eachHeight={props.eachHeight}
          todayBeforeForbidden={props.todayBeforeForbidden}
        />
      );
      break;
    case 1:
      model = (
        <YearSelectPanel
          selectYear={checkYear}
          monthLastChecked={monthLastChecked}
          yearLastChecked={yearLastChecked}
          monthChecked={monthChecked}
          yearChecked={yearChecked}
          prevAndNext={prevAndNext}
          isLastChecked={isLastChecked}
          eachHeight={props.eachHeight}
        />
      );
      break;
    default:
      model = (
        <MonthSelectPanel
          selectMonth={checkMonth}
          monthLastChecked={monthLastChecked}
          yearLastChecked={yearLastChecked}
          monthChecked={monthChecked}
          yearChecked={yearChecked}
          isLastChecked={isLastChecked}
          allDayLastChecked={allDayLastChecked}
          eachHeight={props.eachHeight}
        />
      );
  }

  /**
   * 选择时间
   */
  const handleTime = () => {
    setTimeOpen(true);
  };

  /**
   * 选择日期
   */
  const handleDate = () => {
    setTimeOpen(false);
  };

  /**
   * 时分秒抛出的事件
   */
  const handleChangeTime = (value: string) => {
    setTime(value);
    renderValue();
  };

  /**
   * 确定
   */
  const onOk = () => {
    renderValue();
  };

  const CalendarDate = () => {
    return (
      <>
        <CalendarHeader
          onClickYearMonthSelect={changeModelState}
          onClickPrevButton={prevButton}
          onClickNextButton={nextButton}
          yearLastChecked={yearLastChecked}
          monthLastChecked={monthLastChecked}
          monthChecked={monthChecked}
          yearChecked={yearChecked}
          modelState={modelState}
          prevAndNext={prevAndNext}
        />
        {modelState === 0 && <CalendarWeekBar />}
        <Divider style={{ marginBottom: '8px' }} />
        {model}
      </>
    );
  };

  const { showTime } = props;
  return (
    <CalendarLayout>
      {showTime ? (
        <>
          {timeOpen ? (
            <TimeSelectPanel
              time={time}
              handleChangeTime={handleChangeTime}
              monthChecked={monthChecked}
              yearChecked={yearChecked}
              day={day}
            />
          ) : (
            CalendarDate()
          )}
          <Divider style={{ marginBottom: '8px' }} />
          <TimeButton
            handleDate={handleDate}
            handleTime={handleTime}
            timeOpen={timeOpen}
            onOk={onOk}
          />
        </>
      ) : (
        CalendarDate()
      )}
    </CalendarLayout>
  );
}

export default Calendar;
