export * from './player';
export * from './team';
export * from './league';
export * from './match';

export interface ApiResponse<T> {
    status: 'success' | 'error';
    data: T;
    message?: string;
    code?: string;
}

export interface PaginatedData<T> {
    players: T[];
    total: number;
    page: number;
    totalPages: number;
}
