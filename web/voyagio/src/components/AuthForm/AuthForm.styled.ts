import styled from '@emotion/styled';
import { Button, ButtonProps, createPolymorphicComponent } from '@mantine/core';

export const AuthFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 304px;
`;

export const AuthInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Icon = styled.img`
  size: 24px;
`;

const _GoogleButton = styled(Button)`
  box-shadow: 0px 5px 12px 0px rgba(130, 130, 130, 0.1);

  & .mantine-Button-label {
    gap: 10px;
  }

  &:hover {
    background-color: rgba(193, 194, 197, 0.45);
  }
`;

export const GoogleButton = createPolymorphicComponent<'button', ButtonProps>(
  _GoogleButton
);
