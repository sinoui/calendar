import React from 'react';
import styled from 'styled-components';
import IconButton from 'sinoui-components/IconButton';
import Icon from 'sinoui-components/Icon';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import CalendarHeaderLayout from './CalendarHeaderLayout';
import YearMonthSelect from './YearMonthSelect';

const SpaceColumn = styled.div`
  flex: 1 1 auto;
`;

export interface Props {
  /**
   * 年-月展示信息
   */
  yearMonthMessage?: string;
  /**
   * 点击年-月回调函数
   */
  onClickYearMonthSelect?: () => void;
  /**
   * 上一个按钮回调函数
   */
  onClickPrevButton: () => void;
  /**
   * 下一个按钮回调函数
   */
  onClickNextButton: () => void;
  /**
   * 日历面板
   */
  modelState: number;
  /**
   * 选择的月份
   */
  monthChecked: number;
  /**
   * 选择的年
   */
  yearChecked: number;
  /**
   * 年面板，向前或者向后,1或者-1
   */
  prevAndNext: number;
}

/**
 * 日历顶部组件
 */
function getYearSelectButtonMessage(
  monthChecked: number,
  yearChecked: number,
  prevAndNext: number,
  modelState: number,
) {
  let returnMessage;
  if (modelState === 1) {
    const remainderYear = yearChecked % 24;
    const pageFirstYear = yearChecked - remainderYear;
    let changePageFirstYear = pageFirstYear + 24 * prevAndNext;
    if (changePageFirstYear <= 2) {
      changePageFirstYear = 1990;
    }
    returnMessage = `${changePageFirstYear}-${changePageFirstYear + 24}`;
  }
  if (modelState === 2) {
    returnMessage = yearChecked;
  }
  if (modelState === 0) {
    returnMessage = `${yearChecked}-${monthChecked
      .toString()
      .padStart(2, '0')}`;
  }
  return returnMessage;
}

export default function CalendarHeader(props: Props) {
  const {
    monthChecked,
    yearChecked,
    prevAndNext,
    modelState,
    onClickYearMonthSelect,
    onClickPrevButton,
    onClickNextButton,
  } = props;

  const yearSelectButtonMessage = getYearSelectButtonMessage(
    monthChecked,
    yearChecked,
    prevAndNext,
    modelState,
  );

  const PrevButton = () => {
    return (
      <IconButton onClick={onClickPrevButton}>
        <Icon>
          <MdChevronLeft />
        </Icon>
      </IconButton>
    );
  };

  const NextButton = () => {
    return (
      <IconButton onClick={onClickNextButton}>
        <Icon>
          <MdChevronRight />
        </Icon>
      </IconButton>
    );
  };

  return (
    <CalendarHeaderLayout>
      <YearMonthSelect
        onClickYearMonthSelect={onClickYearMonthSelect}
        yearSelectButtonMessage={yearSelectButtonMessage}
      />
      <SpaceColumn />
      <PrevButton />
      <NextButton />
    </CalendarHeaderLayout>
  );
}
