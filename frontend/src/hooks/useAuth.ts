import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

export function useAuth() {
  const queryClient = useQueryClient();

  const me = useQuery({ queryKey: ['me'], queryFn: api.getMe, staleTime: 60_000 });

  const login = useMutation({
    mutationFn: api.login,
    onSuccess: (data) => queryClient.setQueryData(['me'], { user: data.user }),
  });

  const signup = useMutation({
    mutationFn: api.signup,
    onSuccess: (data) => queryClient.setQueryData(['me'], { user: data.user }),
  });

  const logout = useMutation({
    mutationFn: api.logout,
    onSuccess: () => queryClient.setQueryData(['me'], { user: null }),
  });

  return {
    user: me.data?.user ?? null,
    isLoading: me.isLoading,
    login,
    signup,
    logout,
  };
}
