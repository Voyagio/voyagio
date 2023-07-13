import { Tabs, TabsProps } from '@mantine/core';
import { FC } from 'react';

export const StyledTabs: FC<TabsProps> = (props) => {
  return (
    <Tabs
      unstyled
      styles={{
        tab: {
          backgroundColor: 'white',
          padding: '10px 18px',
          cursor: 'pointer',
          fontSize: '20px',
          fontWeight: 400,
          border: 'none',
          outline: 'none',

          display: 'flex',
          alignItems: 'center',

          '&[data-active]': {
            borderBottom: '2px solid #0b94f8',
            color: '#0b94f8',
          },
        },

        tabsList: {
          display: 'flex',
          gap: '8px',
          paddingTop: '20px',
          background: 'white',
          boxShadow: '0px 5px 12px 0px rgba(130, 130, 130, 0.10)',
        },
      }}
      {...props}
    />
  );
};
