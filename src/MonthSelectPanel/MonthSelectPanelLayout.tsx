import React from 'react';
import styled from 'styled-components';

const MonthSelectPanelBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  justify-content: center;
  justify-items: center;
  align-items: center;
  grid-row-gap: 2px;
  grid-column-gap: 2px;
  padding: 0 8px 8px 8px;
  min-height: 230px;
  display: -ms-grid;
  -ms-grid-columns: 25% 25% 25% 25%;
`;

export interface Props {
  children: React.ReactNode;
}

function MonthSelectPanelBoxContent(props: Props) {
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

  return (
    <MonthSelectPanelBox className="sinoui-calendar-month">
      {child}
    </MonthSelectPanelBox>
  );
}

export default MonthSelectPanelBoxContent;
