import React, { useState } from 'react';
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
  showTime?: string;
  /**
   * 点击确定按钮的回调
   */
  onOk: () => void;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 只是选择时间
   */
  onlyShowTime?: string;
  /**
   * 日历面板
   */
  modelState: number;
  /**
   * 最后选择的月份
   */
  monthLastChecked: number;
  /**
   * 最后选择的年
   */
  yearLastChecked: number;
  /**
   * 选择的月份
   */
  monthChecked: number;
  /**
   * 选择的年
   */
  yearChecked: number;
  /**
   * 年面板，向前或者向后,1或者-1
   */
  prevAndNext: number;
  /**
   * 是否最后选中
   */
  isLastChecked: boolean;
  /**
   * 选择的日
   */
  day: number;
  /**
   * 点击日后选择的日期
   */
  allDayLastChecked: string | number;
  /**
   * 最大值
   */
  max?: string;
  /**
   * 最小值
   */
  min?: string;
  /**
   * 是否第一列显示周一
   */
  isFirstColJanu?: boolean;
}

/**
 * 日历整体组件
 */
function Calendar(props: Props) {
  const {
    dateTime,
    onlyYearMonth,
    showTime,
    onlyShowTime,
    isFirstColJanu,
  } = props;
  const date = dateTime ? dayjs(dateTime) : dayjs();
  const month = date.month() + 1;
  const year = date.year();
  const dayNow = date.date();
  const hour = date
    .hour()
    .toString()
    .padStart(2, '0');
  const minute = date
    .minute()
    .toString()
    .padStart(2, '0');
  const second = date
    .second()
    .toString()
    .padStart(2, '0');

  const [modelState, setModelState] = useState(onlyYearMonth ? 2 : 0);
  const [monthLastChecked, setMonthLastChecked] = useState(month);
  const [yearLastChecked, setYearLastChecked] = useState(year);
  const [monthChecked, setMonthChecked] = useState(month);
  const [yearChecked, setYearChecked] = useState(year);
  const [prevAndNext, setPrevAndNext] = useState(0);
  const [day, setDay] = useState(dayNow);
  const [isLastChecked, setIsLastChecked] = useState(!!dateTime);
  const [allDayLastChecked, setAllDayLastChecked] = useState('');
  const [timeOpen, setTimeOpen] = useState(false);
  const [time, setTime] = useState(
    showTime === 'HH:mm' || onlyShowTime === 'HH:mm'
      ? `${hour}:${minute}`
      : `${hour}:${minute}:${second}`,
  );

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
    const selectDayVal = `${yearChecked}-${monthNum
      .toString()
      .padStart(2, '0')}`;

    const { todayBeforeForbidden, max, min } = props;
    if (
      (onlyYearMonth &&
        todayBeforeForbidden &&
        selectDayVal < dayjs().format('YYYY-MM')) ||
      (onlyYearMonth &&
        !showTime &&
        ((max && min && selectDayVal > max && selectDayVal < min) ||
          (max && selectDayVal > max) ||
          (min && selectDayVal < min)))
    ) {
      return;
    }

    if (props.onlyYearMonth) {
      setModelState(2);
      setYearLastChecked(yearChecked);
    } else {
      setModelState(0);
    }

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
   * 值改变时的回调函数
   */
  const onValueChange = () => {
    if (props.onChange) {
      if (props.showTime) {
        if (props.onlyShowTime) {
          props.onChange(`${time}`);
        } else {
          props.onChange(
            `${yearChecked}-${monthChecked
              .toString()
              .padStart(2, '0')}-${day.toString().padStart(2, '0')} ${time}`,
          );
        }
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

    const { todayBeforeForbidden, max, min } = props;
    if (
      (todayBeforeForbidden && selectDayVal < dayjs().format('YYYY-MM-DD')) ||
      (!showTime &&
        ((max && min && selectDayVal > max && selectDayVal < min) ||
          (max && selectDayVal > max) ||
          (min && selectDayVal < min)))
    ) {
      return;
    }

    setDay(dayVal);
    setYearLastChecked(yearChecked);
    setIsLastChecked(true);
    setMonthLastChecked(monthChecked);
    setAllDayLastChecked(`${yearChecked}-${monthChecked}-${dayVal}`);

    onValueChange();
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
          max={props.max}
          min={props.min}
          showTime={props.showTime}
          isFirstColJanu={props.isFirstColJanu}
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
          onlyYearMonth={props.onlyYearMonth}
          max={props.max}
          min={props.min}
          showTime={props.showTime}
        />
      );
  }

  /**
   * 选择时间
   */
  const onTimepickerButtonClick = () => {
    setTimeOpen(true);
  };

  /**
   * 选择日期
   */
  const onDatepickerButtonClick = () => {
    setTimeOpen(false);
  };

  /**
   * 时分秒抛出的事件
   */
  const handleChangeTime = (value: string) => {
    setTime(value);
    onValueChange();
  };

  /**
   * 确定
   */
  const onOk = () => {
    onValueChange();
    if (props.onOk) {
      props.onOk();
    }
  };

  const CalendarDate = () => {
    return (
      <>
        <CalendarHeader
          onClickYearMonthSelect={changeModelState}
          onClickPrevButton={prevButton}
          onClickNextButton={nextButton}
          monthChecked={monthChecked}
          yearChecked={yearChecked}
          modelState={modelState}
          prevAndNext={prevAndNext}
        />
        {modelState === 0 && (
          <CalendarWeekBar isFirstColJanu={isFirstColJanu} />
        )}
        <Divider style={{ marginBottom: '8px' }} />
        {model}
      </>
    );
  };

  if (onlyShowTime) {
    return (
      <CalendarLayout>
        <TimeSelectPanel
          time={time}
          handleChangeTime={handleChangeTime}
          monthChecked={monthChecked}
          yearChecked={yearChecked}
          day={day}
          showTime={showTime}
          onlyShowTime={onlyShowTime}
        />
        <TimeButton
          onDatepickerButtonClick={onDatepickerButtonClick}
          onTimepickerButtonClick={onTimepickerButtonClick}
          timeOpen={timeOpen}
          onOk={onOk}
          onlyShowTime={onlyShowTime}
        />
      </CalendarLayout>
    );
  }

  return (
    <CalendarLayout data-testid="calendarDay">
      {showTime ? (
        <>
          {timeOpen ? (
            <TimeSelectPanel
              time={time}
              handleChangeTime={handleChangeTime}
              monthChecked={monthChecked}
              yearChecked={yearChecked}
              day={day}
              showTime={showTime}
            />
          ) : (
            CalendarDate()
          )}
          <Divider style={{ marginBottom: '8px' }} />
          <TimeButton
            onDatepickerButtonClick={onDatepickerButtonClick}
            onTimepickerButtonClick={onTimepickerButtonClick}
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
