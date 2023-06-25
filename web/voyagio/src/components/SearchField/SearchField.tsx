import {
  Field, FieldContainer, InsideCard, Label, SearchFieldCard,
} from '/src/components/SearchField/SearchField.styled.ts';
import { FC } from 'react';

export const SearchField: FC = () => (
  <SearchFieldCard>
    <InsideCard>
      <Label>One step for your trip</Label>
      <FieldContainer>
        <Field placeholder="Search..." />
      </FieldContainer>
    </InsideCard>
  </SearchFieldCard>
);
