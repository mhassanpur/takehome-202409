import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PaginatedResponse, TeamMember } from './types';
import config from '../config';

/**
 * TeamMembers API: We use Redux Toolkit's createApi to define a service that interacts with the team members API from
 * the Django server. RTQ Query will automatically generate hooks for each endpoint that can be used in React
 * components and take care of state management, caching, and invalidation.
 * 
 * See: https://redux-toolkit.js.org/rtk-query/overview
 * 
 * Note: For some strange reason, omitting the trailing slash in the query URLs causes CORS errors.
 */

export interface GetTeamMembersArgs {
    limit: number;
    offset: number;
};

export const teamMembersApi = createApi({
    reducerPath: 'teamMembersApi',
    // Use baseUrl from .env file
    baseQuery: fetchBaseQuery({ baseUrl: config.API_BASE_URL }),
    tagTypes: ['TeamMembers', 'TeamMember'],
    endpoints: (builder) => ({
        getTeamMembers: builder.query<PaginatedResponse<TeamMember>, GetTeamMembersArgs>({
            // The GET /teammembers/ endpoint returns a list of team members as part of a paginated response:
            // {
            //     "count": 2,
            //     "next": null,
            //     "previous": null,
            //     "results": [...]
            // }
            query: ({ limit, offset }) => `teammembers/?limit=${limit}&offset=${offset}`,
            forceRefetch: ({ previousArg, currentArg }) => {
                return previousArg !== currentArg;
            },
            providesTags: ['TeamMembers'],
        }),
        getTeamMember: builder.query<TeamMember, string>({
            query: (id) => `teammembers/${id}/`,
            providesTags: ['TeamMember'],
        }),
        addTeamMember: builder.mutation<TeamMember, Partial<TeamMember>>({
            query: (body) => ({
                url: 'teammembers/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['TeamMembers'],
        }),
        updateTeamMember: builder.mutation<TeamMember, Partial<TeamMember>>({
            query: (body) => ({
                url: `teammembers/${body.id}/`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['TeamMembers', 'TeamMember'],
        }),
        deleteTeamMember: builder.mutation<void, string>({
            query: (id) => ({
                url: `teammembers/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['TeamMembers', 'TeamMember'],
        }),
    }),
});

export const {
    useGetTeamMembersQuery,
    useGetTeamMemberQuery,
    useAddTeamMemberMutation,
    useUpdateTeamMemberMutation,
    useDeleteTeamMemberMutation,
} = teamMembersApi;