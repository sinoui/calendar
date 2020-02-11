import React from 'react';
import Button from 'sinoui-components/Button';
import Icon from 'sinoui-components/Icon';
import { Subheading } from 'sinoui-components/Text';
import { MdArrowDropDown } from 'react-icons/md';

export interface Props {
  /**
   * 年-月事件
   */
  onClickYearMonthSelect?: () => void;
  /**
   * 年-月展示信息
   */
  yearSelectButtonMessage?: number | string;
}

/**
 * 日历顶部年-月组件
 */
function YearMonthSelect(props: Props) {
  const { onClickYearMonthSelect, yearSelectButtonMessage } = props;
  return (
    <Button onClick={onClickYearMonthSelect} data-testid="switchYearButton">
      <Subheading data-testid="switchYearContent">
        {yearSelectButtonMessage}
      </Subheading>
      <Icon>
        <MdArrowDropDown />
      </Icon>
    </Button>
  );
}

export default YearMonthSelect;
