import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const slider = keyframes`
  0%, 30%, 100% {
   transform: translateY(0);
   animation-timing-function: ease;
 }
 33% {
   transform: translateY(-100%);
   animation-timing-function: step-end;
 }
 97% {
   transform: translateY(100%);
   animation-timing-function: ease;
 }

`;

export const Slide = styled.div<{ bg: string; delay: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
  animation: ${slider} 19.5s infinite;
  animation-delay: ${(props) => props.delay};
`;
