import { useSuggestions } from '/src/components/SearchField/api';
import { HintsInfo } from '/src/components/SearchField/ui';
import {
  ChangeEvent,
  KeyboardEvent, useEffect,
  useLayoutEffect, useRef, useState,
} from 'react';
import { useNavigate } from 'react-router';

export const useSearchFieldController = (initialValue?: string) => {
  const { suggestions, fetchSuggestions } = useSuggestions();

  const [fieldValue, setFieldValue] = useState(initialValue || '');
  const [visibleFieldValue, setVisibleFieldValue] = useState(initialValue || '');

  const [isHintsShown, setIsHintsShown] = useState(false);

  const [focusPointer, setFocusPointer] = useState(-1);
  const [hints, setHints] = useState<HintsInfo[]>([
    { label: 'Kazan', focusPointer: 1 }, { label: 'Katar', focusPointer: 2 }, { label: 'Karaganda', focusPointer: 3 }]);

  const hintsRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleFocus = (elementFocusPointer: number) => () => {
    setFocusPointer(elementFocusPointer);

    if (elementFocusPointer === 0) {
      setVisibleFieldValue(fieldValue);
    } else if (elementFocusPointer > 0 && elementFocusPointer <= hints.length) {
      setVisibleFieldValue(hints.find((element) => element.focusPointer === elementFocusPointer)?.label || '');
    }
  };

  const handleBlur = () => {
    setFocusPointer(-1);
    setFieldValue(visibleFieldValue);
  };

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;

    setFieldValue(searchQuery);
    setVisibleFieldValue(searchQuery);
    if (searchQuery !== '') fetchSuggestions(searchQuery);
  };

  const handleHintClick = (elementFocusPointer: number) => () => {
    const chosenValue = hints[elementFocusPointer - 1].label;

    setFieldValue(chosenValue);
    setVisibleFieldValue(chosenValue);

    navigate(`/search/${chosenValue}`);
    handleBlur();
  };

  const handleKeyDown = (elementFocusPointer: number) => (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();

        if (elementFocusPointer === 1) {
          fieldRef.current?.focus();
          setFocusPointer(focusPointer - 1);
        } else if (elementFocusPointer > 1) {
          (hintsRef.current?.children[focusPointer - 1 - 1] as HTMLButtonElement).focus();
          setFocusPointer(focusPointer - 1);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();

        if (elementFocusPointer === 0) {
          (hintsRef.current?.firstChild as HTMLButtonElement).focus();
          setFocusPointer(focusPointer + 1);
        } else if (elementFocusPointer < hints.length) {
          (hintsRef.current?.children[focusPointer - 1 + 1] as HTMLButtonElement).focus();
          setFocusPointer(focusPointer + 1);
        }
        break;
      case 'Enter':
        event.preventDefault();

        if (elementFocusPointer >= 1) {
          handleHintClick(elementFocusPointer)();
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setIsHintsShown(focusPointer !== -1);
  }, [focusPointer]);

  useLayoutEffect(() => {
    if (suggestions) {
      setHints(
        suggestions
          .slice(0, 5)
          .map((element, index) => ({ label: element.value, focusPointer: index + 1 })),
      );
      return;
    }
    setHints([]);
  }, [suggestions]);

  return {
    hints,
    isHintsShown: isHintsShown && fieldValue !== '',
    handleFocus,
    handleBlur,
    hintsRef,
    fieldRef,
    handleKeyDown,
    handleFieldChange,
    handleHintClick,
    visibleFieldValue,
  } as const;
};
