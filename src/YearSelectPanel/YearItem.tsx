import React from 'react';
import styled from 'styled-components';
import { Body1 } from 'sinoui-components/Text';
import { Theme } from '@sinoui/theme';

export interface Props {
  /**
   * 年
   */
  title: string;
  /**
   * 是否同一年
   */
  sameYear?: boolean;
  /**
   * 是否选中
   */
  checked?: boolean;
  /**
   * 选择年的回调函数
   */
  selectYear: (value: string) => void;
  /**
   * 是否当前年
   */
  enable?: boolean;
  /**
   * 每个格子的高度
   */
  eachHeight?: number;
}

const backgroundFun = (props: {
  checked?: boolean;
  enable?: boolean;
  theme: Theme;
}) => {
  const { checked, enable } = props;
  if (checked) {
    return props.theme.palette.primary[500];
  }
  if (enable) {
    return props.theme.palette.background.divider;
  }
  return null;
};

const borderFun = (props: {
  checked?: boolean;
  sameMonth?: boolean;
  theme: Theme;
}) => {
  const { sameMonth, checked } = props;
  if (sameMonth && checked) {
    return `1px solid ${props.theme.palette.primary[500]}`;
  }
  if (sameMonth) {
    return `1px solid ${props.theme.palette.text.secondary}`;
  }
  return null;
};

const YearBox = styled.div<{
  sameYear?: boolean;
  checked?: boolean;
  enable?: boolean;
  eachHeight?: number;
}>`
  width: ${(props) => (props.eachHeight ? '100%' : '60px')};
  height: ${(props) => (props.eachHeight ? `${props.eachHeight}px` : '32px')};
  margin: 2px 0;
  border-radius: ${(props) => !props.eachHeight && '999px'};
  display: grid;
  justify-content: center;
  align-items: center;
  background: ${(props) => backgroundFun(props)};
  border: ${(props) => borderFun(props)};
  box-shadow: ${(props) =>
    props.sameYear
      ? `inset 0 0 0 1px ${props.theme.palette.background.paper}`
      : null};

  &:hover {
    cursor: pointer;
    background: ${(props) =>
      !props.checked ? props.theme.palette.background.appBar : null};
  }
`;

const TitleBox = styled(Body1)<{ checked?: boolean }>`
  color: ${(props) =>
    props.checked
      ? props.theme.palette.text.snackbar
      : props.theme.palette.text.secondary};
`;

export default function YearItem(props: Props) {
  const { sameYear, checked, selectYear, title, enable, eachHeight } = props;
  return (
    <YearBox
      sameYear={sameYear}
      checked={checked}
      onClick={() => selectYear(title)}
      enable={enable}
      eachHeight={eachHeight}
    >
      <TitleBox checked={checked}>{title}</TitleBox>
    </YearBox>
  );
}
