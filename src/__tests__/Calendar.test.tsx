import React from 'react';
// import renderer from 'react-test-renderer';
// import 'jest-styled-components';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import dayjs from 'dayjs';
import TestWrapper from './TestWrapper';
import Calendar from '../Calendar';

/**
 * Calendar 测试
 */

const months = [
  '十二月',
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
];

const getMonthData = (month: number) => {
  return months[month];
};

describe('Calendar 单元测试', () => {
  afterEach(cleanup);

  test('点击上个月', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Calendar />
      </TestWrapper>,
    );

    const month = dayjs().month() + 1;
    const prevButton = getByTestId('prevButton');
    const calendarMonth = getByTestId('calendarMonth');
    const monthNew = getMonthData(month - 1);

    fireEvent.click(prevButton);
    expect(calendarMonth).toHaveTextContent(monthNew);
  });

  test('点击下个月', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Calendar />
      </TestWrapper>,
    );

    const month = dayjs().month() + 1;
    const nextButton = getByTestId('nextButton');
    const calendarMonth = getByTestId('calendarMonth');
    const monthNew = getMonthData(month === 12 ? 0 : month + 1);

    fireEvent.click(nextButton);
    expect(calendarMonth).toHaveTextContent(monthNew);
  });

  test('选中天', () => {
    const { container } = render(
      <TestWrapper>
        <Calendar dateTime="2020-02-10" />
      </TestWrapper>,
    );

    const selectedDay = container.querySelector('.sinoui-calendar--dayChecked');
    expect(selectedDay).toHaveTextContent('10');
  });

  test('当月第一天是周几', () => {
    const { container } = render(
      <TestWrapper>
        <Calendar />
      </TestWrapper>,
    );

    const year = dayjs().year();
    const month = dayjs().month() + 1;
    const day = dayjs(`${year}-${month}-01`).day();
    const calendarDay = container.querySelectorAll('.sinoui-calendar--dayItem');
    expect(calendarDay.length).toEqual(day);
  });

  test('切换年，点击上一个', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Calendar />
      </TestWrapper>,
    );

    const year = dayjs().year();
    const remainderYear = year % 24;
    const pageFirstYear = year - remainderYear;
    const changePageFirstYear = pageFirstYear + 24 * 0;
    const switchYearButton = getByTestId('switchYearButton');
    const switchYearContent = getByTestId('switchYearContent');

    fireEvent.click(switchYearButton);
    expect(switchYearContent).toHaveTextContent(changePageFirstYear.toString());

    const prevButton = getByTestId('prevButton');
    const firstYearNew = pageFirstYear + 24 * -1;
    fireEvent.click(prevButton);
    expect(switchYearContent).toHaveTextContent(firstYearNew.toString());
  });

  test('切换年，点击下一个', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Calendar />
      </TestWrapper>,
    );

    const year = dayjs().year();
    const remainderYear = year % 24;
    const pageFirstYear = year - remainderYear;
    const changePageFirstYear = pageFirstYear + 24 * 0;
    const switchYearButton = getByTestId('switchYearButton');
    const switchYearContent = getByTestId('switchYearContent');

    fireEvent.click(switchYearButton);
    expect(switchYearContent).toHaveTextContent(changePageFirstYear.toString());

    const nextButton = getByTestId('nextButton');
    const firstYearNew = pageFirstYear + 24 * 1;
    fireEvent.click(nextButton);
    expect(switchYearContent).toHaveTextContent(firstYearNew.toString());
  });

  test('月面板，点击上一年', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Calendar onlyYearMonth />
      </TestWrapper>,
    );

    const year = dayjs().year();
    const calendarYear = getByTestId('calendarYear');
    const prevButton = getByTestId('prevButton');
    const val = (year - 1).toString();

    fireEvent.click(prevButton);
    expect(calendarYear).toHaveTextContent(val);
  });

  test('月面板，点击下一年', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Calendar onlyYearMonth />
      </TestWrapper>,
    );

    const year = dayjs().year();
    const calendarYear = getByTestId('calendarYear');
    const nextButton = getByTestId('nextButton');
    const val = (year + 1).toString();

    fireEvent.click(nextButton);
    expect(calendarYear).toHaveTextContent(val);
  });
});
