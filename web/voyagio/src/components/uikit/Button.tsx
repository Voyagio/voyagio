import { IconContainer, StyledButton, StyledButtonProps } from '/src/components/uikit/Button.styled.ts';
import { Flex } from '/src/components/uikit/Flex.ts';
import { IconProps } from '/src/components/uikit/Icon.ts';
import {
  forwardRef, PropsWithChildren, Ref, ReactElement,
} from 'react';

interface BaseButtonProps {
  icon?: ReactElement<IconProps>
}

type ButtonProps = BaseButtonProps & StyledButtonProps;

const ButtonComponent = (
  { children, icon, ...props }: PropsWithChildren<ButtonProps>,
  forwardedRef: Ref<HTMLButtonElement>,
) => (
  <StyledButton ref={forwardedRef} {...props}>
    <Flex gap={8} justify="center">
      {icon && <IconContainer>{icon}</IconContainer>}
      {children && <p>{children}</p>}
    </Flex>
  </StyledButton>
);

export const Button = forwardRef(ButtonComponent);
