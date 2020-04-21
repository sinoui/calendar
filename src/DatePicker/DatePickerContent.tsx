import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Popover from '@sinoui/core/Popover';
import Calendar from '../Calendar';

export interface Props {
  /**
   * 是否显示日历
   */
  open?: boolean;
  /**
   * value值
   */
  value: string;
  /**
   * 值变更时的回调函数
   */
  onChange?: (
    event: React.MouseEvent<HTMLElement> | any,
    value?: string,
  ) => void;
  /**
   * 日历关闭时的回调函数
   */
  onClose: () => void;
}

const InputWrapper = styled.input`
  border: 0;
  outline: none;
  background: transparent;
`;

const CalendarWrapper = styled.div`
  & .sinoui-calendar {
    position: absolute;
    left: 0px;
    top: 20px;
    box-shadow: ${(props) => props.theme.shadows[1]};
    background-color: ${(props) => props.theme.palette.background.paper};
  }
`;

function DatePickerContent(props: Props) {
  const { open, value: valueProp, onChange, onClose, ...rest } = props;

  const [value, setValue] = useState(valueProp);

  useEffect(() => {
    if (value !== valueProp) {
      setValue(valueProp);
    }
  }, [value, valueProp]);

  const onClick = useCallback(
    (val: string) => {
      setValue(val);

      if (onChange) {
        // eslint-disable-next-line no-restricted-globals
        Object.defineProperty(event, 'target', {
          writable: true,
          value: { value: val },
        });

        // eslint-disable-next-line no-restricted-globals
        onChange(event, val);
        if (onClose) {
          onClose();
        }
      }
    },
    [onChange, onClose],
  );

  const onRequestClose = () => {
    onClose();
  };

  return (
    <>
      <InputWrapper type="text" value={value} readOnly />
      <Popover
        open={open}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onRequestClose={onRequestClose}
        {...rest}
      >
        <CalendarWrapper>
          <Calendar dateTime={value} onChange={onClick} {...rest} />
        </CalendarWrapper>
      </Popover>
    </>
  );
}

export default DatePickerContent;
