import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

export function useCloneUrl(repo) {
  const { session } = useAuth();
  const [cloneCommand, setCloneCommand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCloneUrl = useCallback(async () => {
    if (!session?.access_token) {
      setError('No active session');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/clone-url?repo=${repo}`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to load install command');
        return;
      }

      setCloneCommand(data.cloneCommand);
    } catch (err) {
      setError('Network error — try again');
    } finally {
      setLoading(false);
    }
  }, [repo, session?.access_token]);

  useEffect(() => {
    fetchCloneUrl();
  }, [fetchCloneUrl]);

  return { cloneCommand, loading, error, refetch: fetchCloneUrl };
}
