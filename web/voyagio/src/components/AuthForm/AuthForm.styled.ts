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

interface IconProps {
  isAccentColor?: boolean
}

export const Icon = styled.img<IconProps>`
  size: 24px;
  ${({ isAccentColor }) => (isAccentColor ? 'filter: invert(37%) sepia(92%) saturate(1557%) hue-rotate(186deg) brightness(103%) contrast(95%);' : '')}
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
  _GoogleButton,
);
