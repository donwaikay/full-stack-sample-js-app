import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export function useCatalog() {
  return useQuery({ queryKey: ['titles'], queryFn: api.getTitles, staleTime: 5 * 60_000 });
}
