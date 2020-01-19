import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestWrapper from './TestWrapper';
import Calendar from '../Calendar';

describe('Calendar 单元测试', () => {
  afterEach(cleanup);

  test('关闭动画结束后触发的回调函数', async () => {
    // 测试首次渲染
    const { getByTestId, container } = render(
      <TestWrapper>
        <Calendar />
      </TestWrapper>,
    );

    const calendarDay = getByTestId('calendarDay');
    // const closeButton = getByTestId('closeButton');

    // expect(calendarDay).toHaveTextContent('提示信息');

    // fireEvent.click(closeButton);

    // expect(container.querySelector('.sinoui-alert')).toBeFalsy();
  });
});
