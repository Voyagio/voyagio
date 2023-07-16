import styled from '@emotion/styled';

interface FlexProps {
  direction?: 'column'
  gap?: number
  justify?: string
  alignItems?: string
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  justify-content: center;
  
  ${({ direction }) => (direction ? `flex-direction: ${direction};` : '')}
  ${({ gap }) => (gap ? `gap: ${gap}px;` : '')}
  ${({ justify }) => (justify ? `justify-content: ${justify};` : '')}
  ${({ alignItems }) => (alignItems ? `align-items: ${alignItems};` : '')}
`;
