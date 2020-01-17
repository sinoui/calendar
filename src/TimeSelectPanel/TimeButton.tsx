import React from 'react';
import Button from 'sinoui-components/Button';
import styled from 'styled-components';

const ButtonContent = styled.div`
  float: right;
`;

interface Props {
  timeOpen: boolean;
  handleDate: () => void;
  handleTime: () => void;
  onOk: () => void;
}

export default function TimeButton(props: Props) {
  const { timeOpen, handleDate, handleTime, onOk } = props;
  return (
    <ButtonContent>
      {timeOpen ? (
        <Button onClick={handleDate}>选择日期</Button>
      ) : (
        <Button onClick={handleTime}>选择时间</Button>
      )}
      <Button onClick={onOk}>确定</Button>
    </ButtonContent>
  );
}
