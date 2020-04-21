import React from 'react';
import Button from '@sinoui/core/Button';
import SvgIcon from '@sinoui/core/SvgIcon';
import Subtitle1 from '@sinoui/core/Subtitle1';
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
      <Subtitle1 data-testid="switchYearContent">
        {yearSelectButtonMessage}
      </Subtitle1>
      <SvgIcon as={modelState === 1 ? MdArrowDropUp : MdArrowDropDown} />
    </Button>
  );
}

export default YearMonthSelect;
