import { useState, useCallback, useRef, useEffect } from 'react';

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const activeHttpRequest = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequest.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: httpAbortCtrl.signal
        });

        const data = await response.json();

        activeHttpRequest.current = activeHttpRequest.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );
        if (!response.ok) {
          throw new Error(data.message);
        }
        setIsLoading(false);
        return data;
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
        throw error;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequest.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { sendRequest, isLoading, error, clearError };
};
