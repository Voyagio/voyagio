import { Modal } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';

type StyledModalProps = {
  opened: boolean;
  onClose: () => void;
};

export const StyledModal: FC<PropsWithChildren<StyledModalProps>> = ({
  opened,
  onClose,
  children,
}) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      size="auto"
      padding={0}
      radius={20}
      overlayProps={{
        blur: '2.5px',
        color: '#4e4e4e',
        opacity: 0.15,
      }}
      centered
    >
      {children}
    </Modal>
  );
};
