import { API_BASE_URL } from './constants';

class ApiClient {
    async get<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
        let url = `${API_BASE_URL}${endpoint}`;
        if (params) {
            const query = new URLSearchParams(params as Record<string, string>).toString();
            url += `?${query}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            let errorMsg = 'Error en la petición';
            try {
                const errorData = await response.json();
                errorMsg = errorData.message || errorMsg;
            } catch {
                // Ignore parse errors
            }
            throw new Error(errorMsg);
        }

        const data = await response.json();
        return data.data; // Desempaquetamos la propiedad API "data" de nuestra API REST
    }
}

export const apiClient = new ApiClient();
