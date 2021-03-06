import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MenuListItem } from '@sinoui/core/Menu';
import MenuList from '@sinoui/core/Menu/MenuList';
import Divider from '@sinoui/core/Divider';

/**
 * 时间组件
 */

const TimeSelectBox = styled.div<{ showTime?: string; onlyShowTime?: string }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.showTime === 'HH:mm' || props.onlyShowTime === 'HH:mm'
      ? 'repeat(2, 50%)'
      : 'repeat(3, 33.33%)'};
  justify-content: center;
  grid-gap: 2px 2px;
  min-height: 270px;
  background-color: ${(props) => props.theme.palette.background.paper};
  padding: 0px 8px 0px;
  display: -ms-grid;
  -ms-gird-columns: ${(props) =>
    props.showTime === 'HH:mm' || props.onlyShowTime === 'HH:mm'
      ? '50% 50%'
      : '33.33% 33.33% 33.33%'};
  > :nth-child(1) {
    grid-column: 1;
    -ms-grid-column: 1;
  }
  > :nth-child(2) {
    grid-column: 2;
    -ms-grid-column: 2;
  }
  > :nth-child(3) {
    grid-column: 3;
    -ms-grid-column: 3;
  }
`;

const Div = styled.div`
  max-height: 270px;
  overflow-y: hidden;
  &:hover {
    overflow-y: auto;
  }
`;

const Date = styled.div`
  padding: 10px 10px 5px;
`;

const MenuListContent = styled(MenuList)<{
  showTime?: string;
  onlyShowTime?: string;
}>`
  border-right: ${(props) =>
    props.showTime !== 'HH:mm' &&
    props.onlyShowTime !== 'HH:mm' &&
    `1px solid ${props.theme.palette.divider}`};
`;

const MenuListItemContent = styled(MenuListItem)`
  padding-top: 4px;
  padding-bottom: 4px;
`;

interface Props {
  time: string;
  handleChangeTime: (value: string) => void;
  showTime?: string;
}

const hours: string[] = [];
for (let i = 0; i < 24; i += 1) {
  if (i < 10) {
    hours.push(`0${i}`);
  } else {
    hours.push(`${i}`);
  }
}

const minutes: string[] = [];
for (let i = 0; i < 60; i += 1) {
  if (i < 10) {
    minutes.push(`0${i}`);
  } else {
    minutes.push(`${i}`);
  }
}

const seconds: string[] = [];
for (let i = 0; i < 60; i += 1) {
  if (i < 10) {
    seconds.push(`0${i}`);
  } else {
    seconds.push(`${i}`);
  }
}

interface Props {
  /**
   * 选择的年
   */
  yearChecked: number;
  /**
   * 选择的月份
   */
  monthChecked: number;
  /**
   * 选择的日
   */
  day: number;
  /**
   * 默认的时间
   */
  time: string;
  /**
   * 是否显示时间
   */
  showTime?: string;
  /**
   * 是否仅显示时间
   */
  onlyShowTime?: string;
}

/**
 * 时间面板组件
 */
export default function TimeSelectPanel(props: Props) {
  const {
    time,
    yearChecked,
    monthChecked,
    day,
    showTime,
    onlyShowTime,
  } = props;

  const h = parseInt(time.substring(0, 2), 10);
  const hourNum = h && parseInt(time.substring(0, 2), 10);
  const minuteNum =
    parseInt(time.substring(3, 5), 10) && parseInt(time.substring(3, 5), 10);
  const secondNum =
    parseInt(time.substring(6, 8), 10) && parseInt(time.substring(6, 8), 10);

  const hourRef: React.MutableRefObject<any> = useRef(null);
  const minuteRef: React.MutableRefObject<any> = useRef(null);
  const secondRef: React.MutableRefObject<any> = useRef(null);

  useEffect(() => {
    if (hourRef && hourRef.current) {
      hourRef.current.scrollTop = 32 * hourNum;
    }
    if (minuteRef && minuteRef.current) {
      minuteRef.current.scrollTop = 32 * minuteNum;
    }
    if (
      secondRef &&
      secondRef.current &&
      showTime !== 'HH:mm' &&
      onlyShowTime !== 'HH:mm'
    ) {
      secondRef.current.scrollTop = 32 * secondNum;
    }
  }, [hourNum, minuteNum, onlyShowTime, secondNum, showTime]);

  return (
    <div className="sinoui-calendar-time">
      {!onlyShowTime && (
        <Date>
          {yearChecked}年{monthChecked}月{day}日
        </Date>
      )}
      <Divider />

      <TimeSelectBox showTime={showTime} onlyShowTime={onlyShowTime}>
        <Div ref={hourRef}>
          <MenuListContent>
            {hours.map((hour) => (
              <MenuListItemContent
                value={hour}
                key={`${hour}`}
                selected={hour === time.substring(0, 2)}
                onClick={() =>
                  showTime === 'HH:mm' || onlyShowTime === 'HH:mm'
                    ? props.handleChangeTime(
                        time.replace(/\d{2}(:\d{2})/g, `${hour}$1`),
                      )
                    : props.handleChangeTime(
                        time.replace(/\d{2}(:\d{2}:\d{2})/g, `${hour}$1`),
                      )
                }
              >
                {hour}
              </MenuListItemContent>
            ))}
          </MenuListContent>
        </Div>
        <Div ref={minuteRef}>
          <MenuListContent showTime={showTime} onlyShowTime={onlyShowTime}>
            {minutes.map((minute) => (
              <MenuListItemContent
                value={minute}
                key={`${minute}`}
                selected={minute === time.substring(3, 5)}
                onClick={() =>
                  showTime === 'HH:mm' || onlyShowTime === 'HH:mm'
                    ? props.handleChangeTime(
                        time.replace(/(\d{2}:)\d{2}/g, `$1${minute}`),
                      )
                    : props.handleChangeTime(
                        time.replace(/(\d{2}:)\d{2}(:\d{2})/g, `$1${minute}$2`),
                      )
                }
              >
                {minute}
              </MenuListItemContent>
            ))}
          </MenuListContent>
        </Div>
        {showTime !== 'HH:mm' && onlyShowTime !== 'HH:mm' && (
          <Div ref={secondRef}>
            <MenuList>
              {seconds.map((second) => (
                <MenuListItemContent
                  value={second}
                  key={`${second}`}
                  selected={second === time.substring(6, 8)}
                  onClick={() =>
                    props.handleChangeTime(
                      time.replace(/(\d{2}:\d{2}:)\d{2}/g, `$1${second}`),
                    )
                  }
                >
                  {second}
                </MenuListItemContent>
              ))}
            </MenuList>
          </Div>
        )}
      </TimeSelectBox>
      {onlyShowTime && <Divider />}
    </div>
  );
}
