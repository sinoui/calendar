import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import TextInput, { TextInputProps } from '@sinoui/core/TextInput';
import InputAdornment from '@sinoui/core/InputAdornment';
import { MdDateRange } from 'react-icons/md';
import DatePickerContent from './DatePickerContent';

export interface DatePickerProps
  extends Omit<TextInputProps, 'value' | 'multiline' | 'minRows' | 'maxRows'> {
  /**
   * 添加自动定义类型
   */
  className?: string;
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
  onClose?: () => void;
  /**
   * 最小宽度
   */
  minWidth?: number;
  /**
   * 是否显示日历
   */
  open?: boolean;
}

const MdDateRangeWrapper = styled(MdDateRange)`
  cursor: pointer;
`;

/**
 * 日历
 *
 * @export
 * @interface DatePickerProps
 */
const DatePicker = React.forwardRef((props: DatePickerProps, ref) => {
  const {
    className,
    inputProps,
    children,
    minWidth,
    onClose: onCloseProp,
    open: openProp,
    value,
    disabled,
    readOnly,
    error,
    variant = 'standard',
    helperText,
    label,
    dense,
    ...rest
  } = props;

  const [open, setOpen] = useState(openProp ?? false);
  const [focused, setFocused] = useState(false);

  const onClick = () => {
    if (disabled || readOnly) {
      return;
    }

    setOpen(true);
    setFocused(true);
  };

  const onClose = useCallback(() => {
    setOpen(false);

    if (onCloseProp) {
      onCloseProp();
    }
  }, [onCloseProp]);

  const onBlur = (_event: React.FocusEvent<HTMLDivElement>) => {
    setFocused(false);
  };

  const type = {
    inputComponent: DatePickerContent,
    ref,
    label,
    className: classNames('sinoui-date-picker', className),
    focused,
    inputProps: {
      children,
      ...{
        minWidth,
        onClose,
        open,
        onBlur,
      },
      ...inputProps,
      ...rest,
    },
    value,
    disabled,
    readOnly,
    error,
    variant,
    helperText,
    endAdornment: (
      <InputAdornment position="end">
        <MdDateRangeWrapper onClick={onClick} />
      </InputAdornment>
    ),
    dense,
  };

  return React.cloneElement(<TextInput />, type);
});

export default DatePicker;
