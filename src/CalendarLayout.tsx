import classNames from 'classnames';
import styled from 'styled-components';
import Paper from 'sinoui-components/Paper';

const CalendarLayout = styled(Paper).attrs((props) => ({
  className: classNames('sinoui-calendar', props.className),
}))`
  width: 100%;
  box-sizing: content-box;
  min-width: 300px;
  overflow-x: hidden;
  overflow-y: hidden;
`;

export default CalendarLayout;
