import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import type { User } from '../types';

export function useMyList(user: User | null) {
  const queryClient = useQueryClient();

  const myList = useQuery({
    queryKey: ['mylist'],
    queryFn: api.getMyList,
    enabled: !!user,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['mylist'] });

  const add = useMutation({ mutationFn: api.addToMyList, onSuccess: invalidate });
  const remove = useMutation({ mutationFn: api.removeFromMyList, onSuccess: invalidate });

  const titleIds = new Set(myList.data?.titleIds ?? []);

  return {
    titleIds,
    isLoading: myList.isLoading,
    toggle: (titleId: number) => {
      if (titleIds.has(titleId)) remove.mutate(titleId);
      else add.mutate(titleId);
    },
  };
}
