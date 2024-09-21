// Type definitions for API services

export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
};

export enum TeamMemberRole {
    REGULAR = 'regular',
    ADMIN = 'admin',
};

export interface TeamMember {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: TeamMemberRole;
    createdAt: Date;
    updatedAt: Date;
};