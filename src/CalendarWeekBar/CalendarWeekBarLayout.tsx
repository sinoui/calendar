import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

/**
 * 周面板容器组件
 */
const CalendarWeekBarLayout = styled.div.attrs((props) => ({
  className: classNames('sinoui-calendar-week', props.className),
}))`
  display: grid;
  grid-template-columns: repeat(7, 14.29%);
  justify-items: center;
  align-items: center;
  height: 14px;
  line-height: 14px;
  padding: 0 8px 10px 8px;
  display: -ms-grid;
  -ms-grid-columns: 14.29% 14.29% 14.29% 14.29% 14.29% 14.29% 14.29%;
`;

export interface Props {
  children: React.ReactNode;
}

function CalendarWeekBarLayoutContent(props: Props) {
  const { children } = props;

  const child = React.Children.map(
    children as any,
    (node: React.ReactElement<Props>, index: number) => {
      if (React.isValidElement(node)) {
        const type: {} = {
          style: {
            msGridColumn: (index % 7) + 1,
            msGridRow: Math.floor(index / 7) + 1,
          },
        };

        return React.cloneElement(node, type);
      }
      return node;
    },
  );

  return <CalendarWeekBarLayout>{child}</CalendarWeekBarLayout>;
}

export default CalendarWeekBarLayoutContent;
