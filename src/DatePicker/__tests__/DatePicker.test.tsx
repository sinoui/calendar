import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import DatePicker from '../DatePicker';

/**
 * DatePicker 测试
 */

describe('DatePicker 单元测试', () => {
  afterEach(cleanup);

  test('测试默认值显示', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DatePicker value="2020-04-30" />
      </ThemeProvider>,
    );

    const text = container.querySelector('.sinoui-data-picker__input');
    expect(text).toHaveValue('2020-04-30');
  });

  test('测试日历弹窗显示', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <DatePicker value="2020-04-30" open />
      </ThemeProvider>,
    );

    const calendar = document.querySelector('.sinoui-calendar');
    expect(calendar).toBeInTheDocument();
  });

  test('测试天', () => {
    const onChangeVal = jest.fn();
    const onClose = jest.fn();
    render(
      <ThemeProvider theme={defaultTheme}>
        <DatePicker
          value="2020-04-30"
          open
          onChange={onChangeVal}
          data-testid="datePicker"
          onClose={onClose}
        />
      </ThemeProvider>,
    );

    const day = document.querySelectorAll('.sinoui-calendar-eachDay')[3];
    expect(day).toHaveTextContent('1');
  });
});
