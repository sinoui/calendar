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
  /**
   * 选择月的回调函数
   */
  selectMonth: (value: number) => void;
  /**
   * 日历面板
   */
  modelState?: number;
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
  yearChecked?: number;
  /**
   * 年面板，向前或者向后,1或者-1
   */
  prevAndNext?: number;
  /**
   * 是否最后选中
   */
  isLastChecked?: boolean;
  /**
   * 点击日后选择的日期
   */
  allDayLastChecked: string | number;
  /**
   * 每个格子的高度
   */
  eachHeight?: number;
  /**
   * 只是选择年月
   */
  onlyYearMonth?: boolean;
  /**
   * 是否禁止选择当前日期之前的日期
   */
  todayBeforeForbidden?: boolean;
  /**
   * 最大值
   */
  max?: string;
  /**
   * 最小值
   */
  min?: string;
  /**
   * 是否显示时间
   */
  showTime?: string;
}

/**
 * 月面板组件
 */
export default function MonthSelectPanel(props: Props) {
  const { yearChecked, allDayLastChecked, onlyYearMonth } = props;

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

  const isTodayBeforeForbidden = (i: number) => {
    const { todayBeforeForbidden, max, min, showTime } = props;
    const selectDayVal = `${yearChecked}-${i.toString().padStart(2, '0')}`;

    if (
      (onlyYearMonth &&
        todayBeforeForbidden &&
        selectDayVal < dayjs().format('YYYY-MM')) ||
      (onlyYearMonth &&
        !showTime &&
        ((max && min && selectDayVal > max && selectDayVal < min) ||
          (max && selectDayVal > max) ||
          (min && selectDayVal < min)))
    ) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Month>
        <Body2 data-testid="calendarYear">{year}</Body2>
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
                    todayBeforeForbidden={isTodayBeforeForbidden(
                      monthItem.monthNum,
                    )}
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
                    todayBeforeForbidden={isTodayBeforeForbidden(
                      monthItem.monthNum,
                    )}
                  />
                );
              }
              return (
                <MonthItem
                  title={monthItem.title}
                  key={monthItem.title}
                  selectMonth={props.selectMonth}
                  monthNum={monthItem.monthNum}
                  enable
                  eachHeight={props.eachHeight}
                  todayBeforeForbidden={isTodayBeforeForbidden(
                    monthItem.monthNum,
                  )}
                  /* sameMonth */
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
                  todayBeforeForbidden={isTodayBeforeForbidden(
                    monthItem.monthNum,
                  )}
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
                  todayBeforeForbidden={isTodayBeforeForbidden(
                    monthItem.monthNum,
                  )}
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
                  todayBeforeForbidden={isTodayBeforeForbidden(
                    monthItem.monthNum,
                  )}
                />
              );
            }
          }
          if (
            onlyYearMonth &&
            props.yearLastChecked === props.yearChecked &&
            monthItem.monthNum === props.monthChecked
          ) {
            return (
              <MonthItem
                title={monthItem.title}
                key={monthItem.title}
                selectMonth={props.selectMonth}
                monthNum={monthItem.monthNum}
                checked
                eachHeight={props.eachHeight}
                todayBeforeForbidden={isTodayBeforeForbidden(
                  monthItem.monthNum,
                )}
              />
            );
          }
          return (
            <MonthItem
              title={monthItem.title}
              key={monthItem.title}
              selectMonth={props.selectMonth}
              monthNum={monthItem.monthNum}
              eachHeight={props.eachHeight}
              todayBeforeForbidden={isTodayBeforeForbidden(monthItem.monthNum)}
            />
          );
        })}
      </MonthSelectPanelLayout>
    </>
  );
}
