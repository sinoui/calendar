import React from 'react';
import styled from 'styled-components';
import { Body2 } from 'sinoui-components/Text';
import dayjs from 'dayjs';
import MonthSelectPanelLayout from './MonthSelectPanelLayout';
import MonthItem from './MonthItem';

const Month = styled.div`
  width: 280px;
  height: 40px;
  display: grid;
  align-items: center;
  padding-left: 14px;
`;

export interface Props {
  selectMonth: (value: number) => void;
  modelState?: number;
  monthLastChecked?: number;
  yearLastChecked?: number;
  monthChecked?: number;
  yearChecked?: number;
  prevAndNext?: number;
  isLastChecked?: boolean;
  allDayLastChecked: string | number;
  eachHeight?: number;
}

/**
 * 月面板组件
 */
export default function MonthSelectPanel(props: Props) {
  const { yearChecked, allDayLastChecked } = props;

  const year = yearChecked;
  const now = new Date();
  const nowMonth = now.getMonth() + 1;
  const nowYear = now.getFullYear();

  const monthArr = [
    { title: '一月', monthNum: 1 },
    { title: '二月', monthNum: 2 },
    { title: '三月', monthNum: 3 },
    { title: '四月', monthNum: 4 },
    { title: '五月', monthNum: 5 },
    { title: '六月', monthNum: 6 },
    { title: '七月', monthNum: 7 },
    { title: '八月', monthNum: 8 },
    { title: '九月', monthNum: 9 },
    { title: '十月', monthNum: 10 },
    { title: '十一月', monthNum: 11 },
    { title: '十二月', monthNum: 12 },
  ];

  let monthCheckedAll: string | number;
  let yearCheckedAll: string | number;
  if (allDayLastChecked !== '') {
    monthCheckedAll = dayjs(allDayLastChecked).month() + 1;
    yearCheckedAll = dayjs(allDayLastChecked).year();
  } else {
    monthCheckedAll = '';
    yearCheckedAll = '';
  }

  return (
    <>
      <Month>
        <Body2>{year}</Body2>
      </Month>
      <MonthSelectPanelLayout>
        {monthArr.map((monthItem) => {
          if (nowMonth === monthItem.monthNum) {
            if (
              nowYear === props.yearLastChecked &&
              props.yearLastChecked === props.yearChecked &&
              nowMonth === props.monthChecked
            ) {
              if (props.isLastChecked) {
                return (
                  <MonthItem
                    title={monthItem.title}
                    key={monthItem.title}
                    selectMonth={props.selectMonth}
                    monthNum={monthItem.monthNum}
                    checked
                    sameMonth
                    eachHeight={props.eachHeight}
                  />
                );
              }
              if (
                nowMonth !== props.monthChecked &&
                nowYear === props.yearChecked
              ) {
                return (
                  <MonthItem
                    title={monthItem.title}
                    key={monthItem.title}
                    selectMonth={props.selectMonth}
                    monthNum={monthItem.monthNum}
                    sameMonth
                    eachHeight={props.eachHeight}
                  />
                );
              }
              return (
                <MonthItem
                  title={monthItem.title}
                  key={monthItem.title}
                  selectMonth={props.selectMonth}
                  monthNum={monthItem.monthNum}
                  sameMonth
                  enable
                  eachHeight={props.eachHeight}
                />
              );
            }
            if (
              props.yearLastChecked === yearCheckedAll &&
              props.yearLastChecked === props.yearChecked &&
              monthItem.monthNum === props.monthChecked &&
              monthItem.monthNum === monthCheckedAll
            ) {
              return (
                <MonthItem
                  title={monthItem.title}
                  key={monthItem.title}
                  selectMonth={props.selectMonth}
                  monthNum={monthItem.monthNum}
                  checked
                  eachHeight={props.eachHeight}
                />
              );
            }
            if (nowYear === props.yearChecked) {
              return (
                <MonthItem
                  title={monthItem.title}
                  key={monthItem.title}
                  selectMonth={props.selectMonth}
                  monthNum={monthItem.monthNum}
                  sameMonth
                  eachHeight={props.eachHeight}
                />
              );
            }
          } else if (nowMonth !== monthItem.monthNum) {
            if (
              (nowYear === props.yearLastChecked ||
                props.yearLastChecked === yearCheckedAll) &&
              props.yearLastChecked === props.yearChecked &&
              monthItem.monthNum === props.monthLastChecked
            ) {
              return (
                <MonthItem
                  title={monthItem.title}
                  key={monthItem.title}
                  selectMonth={props.selectMonth}
                  monthNum={monthItem.monthNum}
                  checked
                  eachHeight={props.eachHeight}
                />
              );
            }
          }
          return (
            <MonthItem
              title={monthItem.title}
              key={monthItem.title}
              selectMonth={props.selectMonth}
              monthNum={monthItem.monthNum}
              eachHeight={props.eachHeight}
            />
          );
        })}
      </MonthSelectPanelLayout>
    </>
  );
}
