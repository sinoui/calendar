import React from 'react';
import YearItem from './YearItem';
import YearSelectPanelLayout from './YearSelectPanelLayout';

export interface Props {
  selectYear: (value: string) => void;
  monthLastChecked?: number;
  yearLastChecked?: number;
  monthChecked?: number;
  yearChecked: number;
  prevAndNext: number;
  isLastChecked: boolean;
  eachHeight?: number;
}

function getYearDate(yearChecked: number, prevAndNext: number) {
  const yearArr = [];
  const remainderYear = yearChecked % 24;
  const pageFirstYear = yearChecked - remainderYear;
  let changePageFirstYear = pageFirstYear + 24 * prevAndNext;
  if (changePageFirstYear <= 2) {
    changePageFirstYear = 1990;
  }

  // eslint-disable-next-line no-plusplus
  for (let i = changePageFirstYear; i < changePageFirstYear + 24; i++) {
    yearArr.push(i);
  }
  return yearArr;
}

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
              selectYear={props.selectYear}
              checked
              eachHeight={props.eachHeight}
            />
          );
        }
        if (nowYear === yearNum) {
          return (
            <YearItem
              title={yearNum}
              selectYear={props.selectYear}
              sameYear
              eachHeight={props.eachHeight}
            />
          );
        }
        if (props.yearChecked === yearNum) {
          return (
            <YearItem
              title={yearNum}
              selectYear={props.selectYear}
              enable
              eachHeight={props.eachHeight}
            />
          );
        }
        return (
          <YearItem
            title={yearNum}
            selectYear={props.selectYear}
            eachHeight={props.eachHeight}
          />
        );
      })}
    </YearSelectPanelLayout>
  );
}