import React from 'react';
import Button from 'sinoui-components/Button';
import Icon from 'sinoui-components/Icon';
import { Subheading } from 'sinoui-components/Text';
import { MdArrowDropDown } from 'react-icons/md';

export interface Props {
  onClickYearMonthSelect?: () => void;
  monthLastChecked?: number;
  yearLastChecked?: number;
  yearSelectButtonMessage?: number | string;
}

function YearMonthSelect(props: Props) {
  const { onClickYearMonthSelect, yearSelectButtonMessage } = props;
  return (
    <Button onClick={onClickYearMonthSelect}>
      <Subheading>{yearSelectButtonMessage}</Subheading>
      <Icon>
        <MdArrowDropDown />
      </Icon>
    </Button>
  );
}

export default YearMonthSelect;
