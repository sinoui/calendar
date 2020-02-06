import styled from 'styled-components';
import classNames from 'classnames';

/**
 * 日历顶部容器组件
 */
const CalendarHeaderLayout = styled.div.attrs((props) => ({
  className: classNames('sinoui-calendar-header', props.className),
}))`
  display: flex;
  height: 54px;
  padding: 0px 8px 0px 0px;
`;

export default CalendarHeaderLayout;
