import styled from "@emotion/styled";

interface HeadingProps {
  size: number;
}

export const Heading = styled.h1<HeadingProps>`
  ${({ size }) => size && `font-size: ${size}px;`}
`;
