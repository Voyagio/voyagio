import { useCategories } from '/src/components/Filter/api';
import { FilterState } from '/src/components/Results/useResultsController.ts';
import { useState } from 'react';

export const useFilterController = (
  filterState: FilterState,
  onClose: () => void,
  onFilterChange: (filterState: FilterState) => void,
) => {
  const { categories } = useCategories();
  const [newFilterState, setNewFilterState] = useState(filterState);

  const handleClose = () => {
    setNewFilterState(filterState);
    onClose();
  };

  const handleFilterChange = () => {
    onFilterChange(newFilterState);
    onClose();
  };

  return {
    newFilterState, setNewFilterState, handleClose, handleFilterChange, categories,
  } as const;
};
