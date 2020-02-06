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
`;

export default YearSelectPanelLayout;
