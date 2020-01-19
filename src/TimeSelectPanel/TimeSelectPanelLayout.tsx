import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function TimeSelectPanelLayout(props: Props) {
  const { children } = props;
  return <div className="sinoui-calendar-time">{children}</div>;
}
