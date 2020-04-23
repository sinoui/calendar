import React, { useState, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import DatePicker from '../../src/DatePicker';

function DatePickerDemo() {
  const [value, setValue] = useState('2020-05-18');

  const onChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <DatePicker value={value} onChange={onChange} />
    </ThemeProvider>
  );
}

export default DatePickerDemo;
