import {
  Field,
  FieldContainer,
  FiledSmallContainer,
  HintsContainer,
  InsideCard,
  Label,
  SearchFieldCard,
  SmallField,
} from '/src/components/SearchField/SearchField.styled.ts';
import { Hints } from '/src/components/SearchField/ui';
import { useSearchFieldController } from '/src/components/SearchField/useSearchFieldController.ts';
import { FC } from 'react';

interface SearchFieldProps {
  fieldSize: 'large' | 'small'
  initialValue?: string
}

export const SearchField: FC<SearchFieldProps> = ({ fieldSize, initialValue }) => {
  const {
    isHintsShown,
    hints,
    handleFocus,
    handleBlur,
    hintsRef,
    handleKeyDown,
    fieldRef,
    handleFieldChange,
    visibleFieldValue,
    handleHintClick,
  } = useSearchFieldController(initialValue);

  return (
    fieldSize === 'large' ? (
      <SearchFieldCard>
        <InsideCard>
          <Label>One step for your trip</Label>
          <FieldContainer size="large">
            <Field
              value={visibleFieldValue}
              onChange={handleFieldChange}
              ref={fieldRef}
              onKeyDown={handleKeyDown(0)}
              onBlur={handleBlur}
              onFocus={handleFocus(0)}
              placeholder="Search..."
            />
          </FieldContainer>
          <HintsContainer>
            {
                isHintsShown
                && (
                  <Hints
                    hintsRef={hintsRef}
                    hints={hints}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    onClick={handleHintClick}
                  />
                )
              }
          </HintsContainer>
        </InsideCard>
      </SearchFieldCard>
    ) : (
      <FiledSmallContainer>
        <FieldContainer size="small">
          <SmallField
            value={visibleFieldValue}
            onChange={handleFieldChange}
            ref={fieldRef}
            onKeyDown={handleKeyDown(0)}
            onBlur={handleBlur}
            onFocus={handleFocus(0)}
            placeholder="Search..."
          />
        </FieldContainer>
        <HintsContainer>
          {
          isHintsShown
          && (
            <Hints
              hintsRef={hintsRef}
              hints={hints}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onClick={handleHintClick}
            />
          )
        }
        </HintsContainer>
      </FiledSmallContainer>
    )
  );
};
