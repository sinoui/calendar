import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Calendar from '../src/Calendar';

export default {
  title: 'Calendar',
};

export const 基本使用 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Calendar />
  </ThemeProvider>
);

export const 设置第一列显示周一 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Calendar isFirstColJanu />
  </ThemeProvider>
);

export const 设置每个格子高度的日历 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Calendar eachHeight={100} />
  </ThemeProvider>
);

export const 设置显示时间时分秒 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Calendar showTime="HH:mm:ss" />
  </ThemeProvider>
);

export const 显示时间时分 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Calendar showTime="HH:mm" />
  </ThemeProvider>
);

export const 只是显示时间时分秒 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Calendar onlyShowTime="HH:mm:ss" />
  </ThemeProvider>
);

export const 只是显示时间时分秒有默认值 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Calendar onlyShowTime="HH:mm:ss" dateTime="00:21:56" />
  </ThemeProvider>
);

export const 只是显示时间时分 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Calendar onlyShowTime="HH:mm" />
  </ThemeProvider>
);

export const 只是显示时间时分有默认值 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Calendar onlyShowTime="HH:mm" dateTime="00:21" />
  </ThemeProvider>
);

export const 禁止选择当前日期之前的日期 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Calendar todayBeforeForbidden />
  </ThemeProvider>
);

export const 设置选择年月 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Calendar onlyYearMonth />
  </ThemeProvider>
);

export const 设置最小值和最大值 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Calendar min="2020-02-01" max="2020-02-20" />
  </ThemeProvider>
);

export const 选择年月的最小值和最大值 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Calendar onlyYearMonth min="2020-02" max="2020-11" />
  </ThemeProvider>
);
