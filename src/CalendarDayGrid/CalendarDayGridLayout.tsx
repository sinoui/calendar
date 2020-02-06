import styled from 'styled-components';
import classNames from 'classnames';

/**
 * 日面板容器组件
 */
const CalendarDayGridLayout = styled.div.attrs<{ weekDay?: number }>(
  (props) => ({
    className: classNames('sinoui-calendar-day', props.className),
  }),
)`
  display: grid;
  grid-template-columns: repeat(7, 14.29%);
  justify-content: center;
  justify-items: center;
  align-items: center;
  grid-row-gap: 2px;
  grid-column-gap: 2px;
  padding: 0 8px 8px 8px;
  margin-top: ${(props) =>
    props.weekDay && props.weekDay <= 2 ? '18px' : '0px'};
  min-height: 246px;
`;

export default CalendarDayGridLayout;
