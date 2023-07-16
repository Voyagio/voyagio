import { FilterContainer, FilterModalStyled } from '/src/components/Filter/FilterModal.styled.ts';
import { useFilterController } from '/src/components/Filter/useFilterController.ts';
import { FilterState } from '/src/components/Results/useResultsController.ts';
import {
  Button, Checkbox, Flex, Radio,
} from '@mantine/core';
import { FC } from 'react';

interface FilterModalProps {
  opened: boolean
  onClose: () => void
  filterState: FilterState
  onFilterChange: (filter: FilterState) => void
}

export const FilterModal: FC<FilterModalProps> = ({
  opened,
  onClose,
  filterState,
  onFilterChange,
}) => {
  const {
    newFilterState,
    setNewFilterState,
    handleClose,
    handleFilterChange,
    categories,
  } = useFilterController(filterState, onClose, onFilterChange);

  return (
    <FilterModalStyled
      opened={opened}
      onClose={handleClose}
      withCloseButton={false}
      transitionProps={{ transition: 'slide-right', duration: 100 }}
      size="auto"
      padding={32}
      xOffset={10}
      yOffset={0}
      radius={20}
      overlayProps={{
        blur: '2.5px',
        color: '#4e4e4e',
        opacity: 0.15,
      }}
    >
      <FilterContainer>
        <Flex direction="column" gap={30}>
          <h1>Filter</h1>
        
          <Flex direction="column" gap={10}>
            <h3>Minimal rating</h3>
            <Radio.Group
              value={
                newFilterState.rating_filter.min_rating.toString()
            }
              onChange={
               (value) => setNewFilterState({
                 ...newFilterState,
                 rating_filter: {
                   ...newFilterState.rating_filter,
                   min_rating: parseInt(value, 10),
                 },
               })
              }
              name="minimalRating"
            >
              <Flex direction="column" gap={5}>
                <Radio value="0" label="Any" />
                <Radio value="3" label="3" />
                <Radio value="4" label="4" />
                <Radio value="5" label="5" />
              </Flex>
            </Radio.Group>
          </Flex>
          <Flex direction="column" gap={10}>
            <h3>Categories</h3>
            <Checkbox.Group
              value={newFilterState.category_filter.category_ids}
              onChange={(value) => setNewFilterState({
                ...newFilterState,
                category_filter: {
                  ...newFilterState.category_filter,
                  category_ids: value,
                },
              })}
            >
              <Flex direction="column" gap={5}>
                {categories.map(({ id, name }) => <Checkbox key={id} value={id} label={name} />)}
              </Flex>
            </Checkbox.Group>
          </Flex>
        </Flex>
        <Flex direction="column" gap={10}>
          <Button onClick={handleFilterChange}>Select</Button>
          <Button variant="light" onClick={handleClose}>Cancel</Button>
        </Flex>
      </FilterContainer>
    </FilterModalStyled>
  );
};
