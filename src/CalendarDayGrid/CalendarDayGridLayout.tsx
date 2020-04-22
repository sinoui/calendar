import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

/**
 * 日面板容器组件
 */
const CalendarDayGridLayout = styled.div.attrs((props) => ({
  className: classNames('sinoui-calendar-day', props.className),
}))`
  display: grid;
  grid-template-columns: repeat(7, 14.29%);
  justify-content: center;
  justify-items: center;
  align-items: center;
  grid-row-gap: 2px;
  grid-column-gap: 2px;
  padding: 0 8px 8px 8px;
  margin-top: 0px;
  min-height: 246px;
  display: -ms-grid;
  -ms-grid-columns: 14.29% 14.29% 14.29% 14.29% 14.29% 14.29% 14.29%;
`;

export interface Props {
  children: React.ReactNode;
}

function CalendarDayGridLayoutContent(props: Props) {
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

  return <CalendarDayGridLayout>{child}</CalendarDayGridLayout>;
}

export default CalendarDayGridLayoutContent;
