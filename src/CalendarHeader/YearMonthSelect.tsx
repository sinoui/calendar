import React from 'react';
import Button from 'sinoui-components/Button';
import Icon from 'sinoui-components/Icon';
import { Subheading } from 'sinoui-components/Text';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

export interface Props {
  /**
   * 年-月事件
   */
  onClickYearMonthSelect?: () => void;
  /**
   * 年-月展示信息
   */
  yearSelectButtonMessage?: number | string;
  /**
   * 日历面板
   */
  modelState: number;
}

/**
 * 日历顶部年-月组件
 */
function YearMonthSelect(props: Props) {
  const { onClickYearMonthSelect, yearSelectButtonMessage, modelState } = props;
  return (
    <Button onClick={onClickYearMonthSelect} data-testid="switchYearButton">
      <Subheading data-testid="switchYearContent">
        {yearSelectButtonMessage}
      </Subheading>
      <Icon>{modelState === 1 ? <MdArrowDropUp /> : <MdArrowDropDown />}</Icon>
    </Button>
  );
}

export default YearMonthSelect;
