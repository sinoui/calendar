import React, { useState, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import DatePicker from '../src/DatePicker';

export default {
  title: 'DatePicker',
};

function DatePickerDemo() {
  const [value, setValue] = useState('2020-05-18');

  const onChange = useCallback((_event, val: string) => {
    setValue(val);
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <DatePicker value={value} onChange={onChange} />
    </ThemeProvider>
  );
}

function DatePickerYearMonth(props: any) {
  const {
    onlyYearMonth,
    todayBeforeForbidden,
    isFirstColJanu,
    eachHeight,
    showTime,
    onlyShowTime,
    value: valueProp,
    min,
    max,
  } = props;

  const [value, setValue] = useState(valueProp);

  const onChange = useCallback((_event, val: string) => {
    setValue(val);
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <DatePicker
        value={value}
        onChange={onChange}
        onlyYearMonth={onlyYearMonth}
        todayBeforeForbidden={todayBeforeForbidden}
        isFirstColJanu={isFirstColJanu}
        eachHeight={eachHeight}
        showTime={showTime && true}
        onlyShowTime={onlyShowTime}
        min={min}
        max={max}
      />
    </ThemeProvider>
  );
}

export const 基本使用 = () => <DatePickerDemo />;

export const 设置选择年月 = () => (
  <ThemeProvider theme={defaultTheme}>
    <DatePickerYearMonth onlyYearMonth />
  </ThemeProvider>
);

export const 禁止选择当前日期之前的日期 = () => (
  <ThemeProvider theme={defaultTheme}>
    <DatePickerYearMonth todayBeforeForbidden />
  </ThemeProvider>
);

export const 设置第一列显示周一 = () => (
  <ThemeProvider theme={defaultTheme}>
    <DatePickerYearMonth isFirstColJanu />
  </ThemeProvider>
);

export const 设置显示时间时分秒 = () => (
  <ThemeProvider theme={defaultTheme}>
    <DatePickerYearMonth showTime="HH:mm:ss" />
  </ThemeProvider>
);

export const 显示时间时分 = () => (
  <ThemeProvider theme={defaultTheme}>
    <DatePickerYearMonth showTime="HH:mm" />
  </ThemeProvider>
);

export const 只是显示时间时分秒 = () => (
  <ThemeProvider theme={defaultTheme}>
    <DatePickerYearMonth onlyShowTime="HH:mm:ss" />
  </ThemeProvider>
);

export const 只是显示时间时分秒有默认值 = () => (
  <ThemeProvider theme={defaultTheme}>
    <DatePickerYearMonth onlyShowTime="HH:mm:ss" value="00:21:56" />
  </ThemeProvider>
);

export const 只是显示时间时分 = () => (
  <ThemeProvider theme={defaultTheme}>
    <DatePickerYearMonth onlyShowTime="HH:mm" />
  </ThemeProvider>
);

export const 只是显示时间时分有默认值 = () => (
  <ThemeProvider theme={defaultTheme}>
    <DatePickerYearMonth onlyShowTime="HH:mm" value="00:21" />
  </ThemeProvider>
);

export const 设置最小值和最大值 = () => (
  <ThemeProvider theme={defaultTheme}>
    <DatePickerYearMonth min="2020-02-01" max="2020-02-20" />
  </ThemeProvider>
);

export const 选择年月的最小值和最大值 = () => (
  <ThemeProvider theme={defaultTheme}>
    <DatePickerYearMonth onlyYearMonth min="2020-02" max="2020-11" />
  </ThemeProvider>
);
