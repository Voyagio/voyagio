import styled from '@emotion/styled';
import CssFilterConverter from 'css-filter-converter';

export interface IconProps {
  color?: string
}

export const Icon = styled.img<IconProps>`
  filter: ${({ color }) => CssFilterConverter.hexToFilter(color || '#000000').color};
`;
