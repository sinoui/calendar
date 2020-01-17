import React from 'react';
import styled from 'styled-components';
import { Select, Option } from 'sinoui-components/Select';
import { MenuListItem, Menu } from 'sinoui-components/Menu';
import TimeSelectPanelLayout from './TimeSelectPanelLayout';

const SelectContent = styled(Select)`
  min-width: 20px;
  margin-top: 5px;
  width: 100%;
`;

interface Props {
  time: string;
  handleChangeTime: (value: string) => void;
}

const hours: string[] = [];
// eslint-disable-next-line no-plusplus
for (let i = 0; i < 24; i++) {
  if (i < 10) {
    hours.push(`0${i}`);
  } else {
    hours.push(`${i}`);
  }
}

const minutes: string[] = [];
// eslint-disable-next-line no-plusplus
for (let i = 0; i < 60; i++) {
  if (i < 10) {
    minutes.push(`0${i}`);
  } else {
    minutes.push(`${i}`);
  }
}

const seconds: string[] = [];
// eslint-disable-next-line no-plusplus
for (let i = 0; i < 60; i++) {
  if (i < 10) {
    seconds.push(`0${i}`);
  } else {
    seconds.push(`${i}`);
  }
}

export default function TimeSelectPanel(props: Props) {
  const { time } = props;
  return (
    <TimeSelectPanelLayout>
      <SelectContent
        value={time.substring(0, 2)}
        onChange={(e) =>
          props.handleChangeTime(
            props.time.replace(/\d{2}(:\d{2}:\d{2})/g, `${e.target.value}$1`),
          )
        }
      >
        {hours.map((hour) => (
          <Option value={hour} key={hour}>
            {hour}
          </Option>
        ))}
      </SelectContent>
      <SelectContent
        value={time.substring(3, 5)}
        onChange={(e) =>
          props.handleChangeTime(
            props.time.replace(
              /(\d{2}:)\d{2}(:\d{2})/g,
              `$1${e.target.value}$2`,
            ),
          )
        }
      >
        {minutes.map((minute) => (
          <Option value={minute} key={minute}>
            {minute}
          </Option>
        ))}
      </SelectContent>
      <SelectContent
        value={time.substring(6, 8)}
        onChange={(e) =>
          props.handleChangeTime(
            props.time.replace(/(\d{2}:\d{2}:)\d{2}/g, `$1${e.target.value}`),
          )
        }
      >
        {seconds.map((second) => (
          <Option value={second} key={second}>
            {second}
          </Option>
        ))}
      </SelectContent>
    </TimeSelectPanelLayout>
  );
}
