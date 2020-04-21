import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

/**
 * 年面板容器组件
 */
const YearSelectPanelLayout = styled.div.attrs((props) => ({
  className: classNames('sinoui-calendar-year', props.className),
}))`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  justify-content: center;
  justify-items: center;
  align-items: center;
  grid-row-gap: 2px;
  grid-column-gap: 2px;
  padding: 0 8px 8px 8px;
  min-height: 270px;
  display: -ms-grid;
  -ms-grid-columns: 25% 25% 25% 25%;
  -ms-grid-row-gap: 2px;
  -ms-grid-column-gap: 2px;
`;

export interface Props {
  children: React.ReactNode;
}

function YearSelectPanelLayoutContent(props: Props) {
  const { children } = props;

  const child = React.Children.map(
    children as any,
    (node: React.ReactElement<Props>, index: number) => {
      if (React.isValidElement(node)) {
        const type: {} = {
          style: {
            msGridColumn: (index % 4) + 1,
            msGridRow: Math.floor(index / 4) + 1,
          },
        };

        return React.cloneElement(node, type);
      }
      return node;
    },
  );

  return <YearSelectPanelLayout>{child}</YearSelectPanelLayout>;
}

export default YearSelectPanelLayoutContent;
