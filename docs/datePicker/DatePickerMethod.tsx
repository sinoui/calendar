import React, { useState, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import DatePicker from '../../src/DatePicker';

function DatePickerMethod(props: any) {
  const {
    onlyYearMonth,
    todayBeforeForbidden,
    isFirstColJanu,
    eachHeight,
    showTime,
    onlyShowTime,
    value: valueProp,
    min,
    max,
  } = props;

  const [value, setValue] = useState(valueProp);

  const onChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <DatePicker
        value={value}
        onChange={onChange}
        onlyYearMonth={onlyYearMonth}
        todayBeforeForbidden={todayBeforeForbidden}
        isFirstColJanu={isFirstColJanu}
        eachHeight={eachHeight}
        showTime={showTime && true}
        onlyShowTime={onlyShowTime}
        min={min}
        max={max}
      />
    </ThemeProvider>
  );
}

export default DatePickerMethod;
