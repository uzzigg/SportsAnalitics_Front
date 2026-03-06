import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../lib/api-client';

export function useFetch<T>(endpoint: string, params?: Record<string, string | number>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Utilizamos JSON.stringify para que el dependency array de useEffect
    // no se dispare indefinidamente por la referencia del objeto params.
    const paramsString = params ? JSON.stringify(params) : '';

    const executeFetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const parsedParams = paramsString ? JSON.parse(paramsString) : undefined;
            const result = await apiClient.get<T>(endpoint, parsedParams);
            setData(result);
        } catch (err: any) {
            setError(err.message || 'Ocurrió un error inesperado');
        } finally {
            setLoading(false);
        }
    }, [endpoint, paramsString]);

    useEffect(() => {
        executeFetch();
    }, [executeFetch]);

    return { data, loading, error, refetch: executeFetch };
}
