import { configureStore } from '@reduxjs/toolkit'
import { teamMembersApi } from './services/teamMembers'
import { setupListeners } from '@reduxjs/toolkit/query'

/**
 * Redux store: We use Redux Toolkit's configureStore to create a Redux store with the teamMembersApi reducer.
 * 
 * See: https://redux-toolkit.js.org/rtk-query/overview#configure-the-store
 */

export const store = configureStore({
    reducer: {
        // Add the generated API reducer to the store
        [teamMembersApi.reducerPath]: teamMembersApi.reducer,
    },
    // Add the API middleware to take advantage of caching, invalidation, polling, etc provided by RTK Query.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(teamMembersApi.middleware),
})

// Provides support for refetchOnFocus/refetchOnReconnect options
setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {teammembers: TeamMembersState}
export type AppDispatch = typeof store.dispatch