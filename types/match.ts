export interface Match {
    id: number;
    homeTeam: { id: number; name: string };
    awayTeam: { id: number; name: string };
    score: { fullTime: { home: number; away: number } };
    status: string;
    utcDate: string;
}
