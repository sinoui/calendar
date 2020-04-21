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
  const [value, setValue] = useState('');

  const onChange = useCallback((_event, val: string) => {
    setValue(val);
  }, []);

  const { onlyYearMonth, todayBeforeForbidden } = props;
  return (
    <ThemeProvider theme={defaultTheme}>
      <DatePicker
        value={value}
        onChange={onChange}
        onlyYearMonth={onlyYearMonth}
        todayBeforeForbidden={todayBeforeForbidden}
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
