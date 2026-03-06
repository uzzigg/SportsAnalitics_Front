import { Team } from './team';

export interface Player {
    id: number;
    name: string;
    position: string;
    dateOfBirth?: string;
    nationality?: string;
    shirtNumber?: number;
    team?: Team;
    photoUrl?: string;
}

export interface PlayerStats {
    matches: any[];
    mockedStats?: {
        goals: number;
        assists: number;
        appearances: number;
        rating: string;
    };
}
