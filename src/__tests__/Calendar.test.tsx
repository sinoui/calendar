import React from 'react';
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

  test('当月最后一天是周几', () => {
    const { container } = render(
      <TestWrapper>
        <Calendar />
      </TestWrapper>,
    );

    const day = dayjs(`${dayjs().endOf('month')}`).day();
    const calendarDay = container.querySelectorAll('.sinoui-calendar--dayEach');
    const week = (calendarDay.length - 1) % 7;
    expect(week).toEqual(day);
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

  test('当天,没有选中任何的显示', () => {
    const { container } = render(
      <TestWrapper>
        <Calendar />
      </TestWrapper>,
    );

    const day = dayjs().date();
    const today = container.querySelector('.sinoui-calendar--dayEnable');
    expect(today).toHaveTextContent(day.toString());
  });

  test('当天选中的显示', () => {
    const { container } = render(
      <TestWrapper>
        <Calendar
          dateTime={`${dayjs().year()}-${
            dayjs().month() + 1
          }-${dayjs().date()}`}
        />
      </TestWrapper>,
    );

    const day = dayjs().date();
    const today = container.querySelector(
      '.sinoui-calendar--dayTodyAndChecked',
    );
    expect(today).toHaveTextContent(day.toString());
  });

  test('选中其它，当天的显示', () => {
    const { container } = render(
      <TestWrapper>
        <Calendar
          dateTime={`${dayjs().year()}-${dayjs().month() + 1}-${
            dayjs().date() - 1
          }`}
        />
      </TestWrapper>,
    );

    const day = dayjs().date();
    const today = container.querySelector('.sinoui-calendar--dayHaveChecked');
    expect(today).toHaveTextContent(day.toString());
  });

  // test('设置最小值，不在范围的颜色显示', () => {
  //   const { container } = render(
  //     <TestWrapper>
  //       <Calendar min="2020-02-02" />
  //     </TestWrapper>,
  //   );

  //   const today = container.querySelector('.sinoui-calendar--dayForbidden');
  //   expect(today).toHaveTextContent('1');
  // });

  // test('设置最大值，不在范围的颜色显示', () => {
  //   const { container } = render(
  //     <TestWrapper>
  //       <Calendar max="2020-02-20" />
  //     </TestWrapper>,
  //   );

  //   const today = container.querySelector('.sinoui-calendar--dayForbidden');
  //   expect(today).toHaveTextContent('21');
  // });

  // test('设置最小值最大值，不在范围的点击显示', () => {
  //   const { container } = render(
  //     <TestWrapper>
  //       <Calendar min="2020-02-01" max="2020-02-11" />
  //     </TestWrapper>,
  //   );

  //   const today: any = container.querySelector('.sinoui-calendar--dayEnable');
  //   fireEvent.click(today);
  //   const checked = container.querySelector('.sinoui-calendar--dayChecked');
  //   expect(checked).toBeNull();
  // });

  // test('点击选择时间', () => {
  //   const { getByTestId, container } = render(
  //     <TestWrapper>
  //       <Calendar showTime="HH:mm:ss" />
  //     </TestWrapper>,
  //   );

  //   const date = dayjs();
  //   const hour = date
  //     .hour()
  //     .toString()
  //     .padStart(2, '0');
  //   const minute = date
  //     .minute()
  //     .toString()
  //     .padStart(2, '0');
  //   const second = date
  //     .second()
  //     .toString()
  //     .padStart(2, '0');

  //   const timeButton = getByTestId('timeButton');
  //   fireEvent.click(timeButton);

  //   const hourContext = container.querySelector('.sinoui-calendar--hour');
  //   const minuteContext = container.querySelector('.sinoui-calendar--minute');
  //   const secondContext = container.querySelector('.sinoui-calendar--second');
  //   expect(hourContext).toHaveTextContent(hour);
  //   expect(minuteContext).toHaveTextContent(minute);
  //   expect(secondContext).toHaveTextContent(second);
  // });

  // test('只是显示时间', () => {
  //   const { container } = render(
  //     <TestWrapper>
  //       <Calendar onlyShowTime="HH:mm:ss" />
  //     </TestWrapper>,
  //   );

  //   const date = dayjs();
  //   const hour = date
  //     .hour()
  //     .toString()
  //     .padStart(2, '0');
  //   const minute = date
  //     .minute()
  //     .toString()
  //     .padStart(2, '0');
  //   const second = date
  //     .second()
  //     .toString()
  //     .padStart(2, '0');
  //   const hourContext = container.querySelector('.sinoui-calendar--hour');
  //   const minuteContext = container.querySelector('.sinoui-calendar--minute');
  //   const secondContext = container.querySelector('.sinoui-calendar--second');
  //   expect(hourContext).toHaveTextContent(hour);
  //   expect(minuteContext).toHaveTextContent(minute);
  //   expect(secondContext).toHaveTextContent(second);
  // });

  // test('只是显示时间,选中的值', () => {
  //   const { container } = render(
  //     <TestWrapper>
  //       <Calendar onlyShowTime="HH:mm:ss" dateTime="18:08:08" />
  //     </TestWrapper>,
  //   );

  //   const hourContext = container.querySelector('.sinoui-calendar--hour');
  //   const minuteContext = container.querySelector('.sinoui-calendar--minute');
  //   const secondContext = container.querySelector('.sinoui-calendar--second');
  //   expect(hourContext).toHaveTextContent('18');
  //   expect(minuteContext).toHaveTextContent('08');
  //   expect(secondContext).toHaveTextContent('08');
  // });
});
