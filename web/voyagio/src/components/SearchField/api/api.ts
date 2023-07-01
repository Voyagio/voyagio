import axios from 'axios';

interface SuggestionDTO {
  value: string
}

export type SuggestionsDTO = SuggestionDTO[];

export const getSuggestions = async (searchQuery: string) => {
  const result = await axios.get<SuggestionsDTO>(`${import.meta.env.VITE_API_URL}/v1/search/suggestions/${searchQuery}`);
  return result.data;
};
