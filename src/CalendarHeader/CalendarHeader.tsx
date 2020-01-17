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
  yearMonthMessage?: string;
  onClickYearMonthSelect?: () => void;
  onClickPrevButton: () => void;
  onClickNextButton: () => void;
  modelState?: number;
  monthLastChecked: number;
  yearLastChecked?: number;
  monthChecked?: number;
  yearChecked?: number;
  prevAndNext?: number;
}

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
    monthLastChecked,
    yearLastChecked,
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

  function NextButton() {
    return (
      <IconButton onClick={onClickNextButton}>
        <Icon>
          <MdChevronRight />
        </Icon>
      </IconButton>
    );
  }

  return (
    <CalendarHeaderLayout>
      <YearMonthSelect
        onClickYearMonthSelect={onClickYearMonthSelect}
        monthLastChecked={monthLastChecked}
        yearLastChecked={yearLastChecked}
        monthChecked={monthChecked}
        yearChecked={yearChecked}
        modelState={modelState}
        yearSelectButtonMessage={yearSelectButtonMessage}
      />
      <SpaceColumn />
      <PrevButton onClickPrevButton={onClickPrevButton} />
      <NextButton onClickNextButton={onClickNextButton} />
    </CalendarHeaderLayout>
  );
}
