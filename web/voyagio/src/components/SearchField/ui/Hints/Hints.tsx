import { HintsContainer, OptionButton } from '/src/components/SearchField/ui/Hints/Hints.styled.ts';
import {
  FC, KeyboardEvent, LegacyRef,
} from 'react';

export interface HintsInfo {
  label: string;
  focusPointer: number
}

interface HintsProps {
  hints: HintsInfo[]
  onFocus: (focusPointer: number) => () => void
  onClick: (focusPointer: number) => () => void
  onBlur: () => void
  onKeyDown: (focusPointer: number) => (event: KeyboardEvent) => void
  hintsRef: LegacyRef<HTMLDivElement>
}

export const Hints: FC<HintsProps> = ({
  hints, onBlur, onFocus, hintsRef, onKeyDown, onClick,
}) => (
  <HintsContainer ref={hintsRef}>
    {hints.map(({ label, focusPointer }) => (
      <OptionButton
        onKeyDown={onKeyDown(focusPointer)}
        onFocus={onFocus(focusPointer)}
        onBlur={onBlur}
        onClick={onClick(focusPointer)}
        key={label}
      >
        {label}
      </OptionButton>
    ))}
  </HintsContainer>
);
