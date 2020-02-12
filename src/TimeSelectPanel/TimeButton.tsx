import React from 'react';
import Button from 'sinoui-components/Button';
import styled from 'styled-components';

const ButtonContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

interface Props {
  /**
   * 时间面板是否显示
   */
  timeOpen: boolean;
  /**
   * 选择日期事件
   */
  onDatepickerButtonClick: () => void;
  /**
   * 选择时间事件
   */
  onTimepickerButtonClick: () => void;
  /**
   * 确定事件
   */
  onOk: () => void;
  /**
   * 是否仅显示时间
   */
  onlyShowTime?: string;
}

/**
 * 选择时间按钮组件
 */
export default function TimeButton(props: Props) {
  const {
    timeOpen,
    onDatepickerButtonClick,
    onTimepickerButtonClick,
    onOk,
    onlyShowTime,
  } = props;
  return (
    <ButtonContent>
      {!onlyShowTime &&
        (timeOpen ? (
          <Button onClick={onDatepickerButtonClick}>选择日期</Button>
        ) : (
          <Button onClick={onTimepickerButtonClick} data-testid="timeButton">
            选择时间
          </Button>
        ))}
      <Button onClick={onOk}>确定</Button>
    </ButtonContent>
  );
}
