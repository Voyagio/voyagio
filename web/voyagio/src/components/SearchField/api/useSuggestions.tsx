import { getSuggestions, SuggestionsDTO } from '/src/components/SearchField/api/api.ts';
import { useState } from 'react';
import { debounce } from 'throttle-debounce';

export const useSuggestions = () => {
  const [suggestions, setSuggestions] = useState<SuggestionsDTO>();

  const fetchSuggestions = debounce(250, async (queryString: string) => {
    setSuggestions(await getSuggestions(queryString));
  });

  return { suggestions, fetchSuggestions } as const;
};
