import React from 'react';
import YearItem from './YearItem';
import YearSelectPanelLayout from './YearSelectPanelLayout';

export interface Props {
  /**
   * 选择年的回调函数
   */
  selectYear: (value: string) => void;
  /**
   * 最后选择的月份
   */
  monthLastChecked?: number;
  /**
   * 最后选择的年
   */
  yearLastChecked?: number;
  /**
   * 选择的月份
   */
  monthChecked?: number;
  /**
   * 选择的年
   */
  yearChecked: number;
  /**
   * 年面板，向前或者向后,1或者-1
   */
  prevAndNext: number;
  /**
   * 是否最后选中
   */
  isLastChecked: boolean;
  /**
   * 每个格子的高度
   */
  eachHeight?: number;
}

/**
 * 获取展示年的函数
 */
function getYearDate(yearChecked: number, prevAndNext: number) {
  const yearArr = [];
  const remainderYear = yearChecked % 24;
  const pageFirstYear = yearChecked - remainderYear;
  let changePageFirstYear = pageFirstYear + 24 * prevAndNext;
  if (changePageFirstYear <= 2) {
    changePageFirstYear = 1990;
  }

  for (let i = changePageFirstYear; i < changePageFirstYear + 24; i += 1) {
    yearArr.push(i);
  }
  return yearArr;
}

/**
 * 年面板组件
 */
export default function YearSelectPanel(props: Props) {
  const { yearChecked, prevAndNext } = props;
  const yearArr = getYearDate(yearChecked, prevAndNext);
  const nowYear = new Date().getFullYear();
  return (
    <YearSelectPanelLayout>
      {yearArr.map((yearNum: any) => {
        if (
          props.yearLastChecked === yearNum &&
          props.isLastChecked &&
          nowYear === yearNum
        ) {
          return (
            <YearItem
              title={yearNum}
              key={yearNum}
              selectYear={props.selectYear}
              checked
              sameYear
              eachHeight={props.eachHeight}
            />
          );
        }
        if (props.yearLastChecked === yearNum && props.isLastChecked) {
          return (
            <YearItem
              title={yearNum}
              key={yearNum}
              selectYear={props.selectYear}
              checked
              eachHeight={props.eachHeight}
            />
          );
        }
        if (props.yearChecked === yearNum) {
          return (
            <YearItem
              title={yearNum}
              key={yearNum}
              selectYear={props.selectYear}
              enable
              eachHeight={props.eachHeight}
            />
          );
        }
        if (nowYear === yearNum) {
          return (
            <YearItem
              title={yearNum}
              key={yearNum}
              selectYear={props.selectYear}
              sameYear
              eachHeight={props.eachHeight}
            />
          );
        }

        return (
          <YearItem
            title={yearNum}
            key={yearNum}
            selectYear={props.selectYear}
            eachHeight={props.eachHeight}
          />
        );
      })}
    </YearSelectPanelLayout>
  );
}
