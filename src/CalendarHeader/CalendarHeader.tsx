import React from 'react';
import styled from 'styled-components';
import IconButton from '@sinoui/core/IconButton';
import SvgIcon from '@sinoui/core/SvgIcon';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import CalendarHeaderLayout from './CalendarHeaderLayout';
import YearMonthSelect from './YearMonthSelect';

const SpaceColumn = styled.div`
  flex: 1 1 auto;
`;

const IconButtonWrapper = styled(IconButton)<{ space?: boolean }>`
  width: 24px;
  height: 24px;
  margin: ${(props) => props.space && '0px 24px 0px 0px'};

  > .sinoui-icon-button__ripple-layout {
    left: 0px;
    top: 0px;
    width: 24px;
    height: 24px;
  }

  > .sinoui-icon-button__ripple-layout > .sinoui-icon-button__ripple {
    width: 24px;
    height: 24px;
  }
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
  /**
   * 年面板
   */
  if (modelState === 1) {
    const remainderYear = yearChecked % 24;
    const pageFirstYear = yearChecked - remainderYear;
    let changePageFirstYear = pageFirstYear + 24 * prevAndNext;
    if (changePageFirstYear <= 2) {
      changePageFirstYear = 1990;
    }
    returnMessage = `${changePageFirstYear}-${changePageFirstYear + 24}`;
  }
  /**
   * 月面板
   */
  if (modelState === 2) {
    returnMessage = yearChecked;
  }
  /**
   * 日面板
   */
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
      <IconButtonWrapper space onClick={onClickPrevButton}>
        <SvgIcon data-testid="prevButton" as={MdChevronLeft} />
      </IconButtonWrapper>
    );
  };

  const NextButton = () => {
    return (
      <IconButtonWrapper onClick={onClickNextButton}>
        <SvgIcon data-testid="nextButton" as={MdChevronRight} />
      </IconButtonWrapper>
    );
  };

  return (
    <CalendarHeaderLayout>
      <YearMonthSelect
        onClickYearMonthSelect={onClickYearMonthSelect}
        yearSelectButtonMessage={yearSelectButtonMessage}
        modelState={modelState}
      />
      <SpaceColumn />
      <PrevButton />
      <NextButton />
    </CalendarHeaderLayout>
  );
}
