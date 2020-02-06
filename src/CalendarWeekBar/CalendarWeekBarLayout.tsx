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
`;

export default CalendarWeekBarLayout;
